const express = require("express");
const Event = require("../models/event");
const { computeHash } = require("../utils/hashUtils");

const router = express.Router();

// POST /api/events - Log an Event
router.post("/events", async (req, res) => {
  try {
    const { eventType, timestamp, sourceAppId, payload } = req.body;

    // Get the last event for chaining
    const lastEvent = await Event.findOne().sort({ _id: -1 });

    const previousHash = lastEvent ? lastEvent.currentHash : "0";
    const currentHash = computeHash({
      eventType,
      timestamp,
      sourceAppId,
      payload,
      previousHash,
    });

    const newEvent = new Event({
      eventType,
      timestamp,
      sourceAppId,
      payload,
      previousHash,
      currentHash,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event logged successfully!", data: newEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events - Query Events
router.get("/events", async (req, res) => {
  try {
    const { eventType, sourceAppId, startDate, endDate } = req.query;
    const filters = {};

    if (eventType) filters.eventType = eventType;
    if (sourceAppId) filters.sourceAppId = sourceAppId;
    if (startDate && endDate) {
      filters.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const events = await Event.find(filters);
    res.status(200).json({ count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
