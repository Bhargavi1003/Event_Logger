
# Event Logging System

A scalable and tamper-proof event logging platform designed for distributed applications. This system provides RESTful APIs for logging and querying events, supports real-time updates via WebSocket, and includes a basic frontend for interaction.

---

## **Features**
- **Event Logging API**: Log events with metadata like event type, timestamp, source application ID, and payload.
- **Tamper-Proof Design**: Events are chained with cryptographic hashes for integrity.
- **Search and Query**: Filter events by type, source, and date range.
- **Real-Time Updates**: WebSocket support for real-time log streaming.
- **Basic Frontend**: Simple interface to log and view events.
- **Scalability**: Designed to handle large datasets with MongoDB's indexing.

---

## **Technologies Used**
### Backend:
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **WebSocket**: Real-time updates.
- **Crypto**: Cryptographic hashing.

### Frontend:
- **HTML, CSS, JavaScript**: Basic user interface.

---

## **Project Structure**
```
event-logging-system/
│
├── backend/
│   ├── app.js               # Main server entry point
│   ├── routes/
│   │   ├── events.js        # API routes for events
│   │   └── real_time.js     # WebSocket route
│   ├── models/
│   │   └── Event.js         # Mongoose schema
│   ├── utils/
│   │   └── hashUtils.js     # Hashing utility functions
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── package.json         # Node.js dependencies
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── index.html           # Frontend HTML
│   ├── style.css            # Frontend CSS
│   ├── script.js            # Frontend JavaScript
│
└── README.md                # Project Documentation
```

---

## **Setup Instructions**

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Ensure MongoDB is running locally or use a cloud instance)
- Web browser (for the frontend)

---

### Backend Setup
1. **Navigate to the `backend` folder**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env` file**:
   ```bash
   touch .env
   ```
   Add the following content to the `.env` file:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/event_logging
   ```
4. **Start the server**:
   ```bash
   node app.js
   ```

The backend will run at `http://localhost:5000`.

---

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Open `index.html` in your browser.

---

## **API Endpoints**

### **POST** `/api/events`
Log a new event.

#### Request Body:
```json
{
  "eventType": "user_login",
  "timestamp": "2024-11-21T12:34:56Z",
  "sourceAppId": "APP001",
  "payload": {
    "userId": "123",
    "ipAddress": "192.168.1.1"
  }
}
```

#### Response:
```json
{
  "message": "Event logged successfully!",
  "data": {
    "eventType": "user_login",
    "timestamp": "2024-11-21T12:34:56Z",
    "sourceAppId": "APP001",
    "payload": { "userId": "123", "ipAddress": "192.168.1.1" },
    "previousHash": "0",
    "currentHash": "abc123..."
  }
}
```

---

### **GET** `/api/events`
Query events by filters.

#### Query Parameters:
- `eventType` (optional)
- `sourceAppId` (optional)
- `startDate` (optional, e.g., `2024-11-20T00:00:00Z`)
- `endDate` (optional, e.g., `2024-11-21T23:59:59Z`)

#### Response:
```json
{
  "count": 2,
  "data": [
    {
      "eventType": "user_login",
      "timestamp": "2024-11-21T12:34:56Z",
      "sourceAppId": "APP001",
      "payload": { "userId": "123", "ipAddress": "192.168.1.1" },
      "previousHash": "0",
      "currentHash": "abc123..."
    }
  ]
}
```

---

## **Frontend Features**
- **Log Event**: Click "Log Event" to log a new event (predefined data).
- **View Events**: Click "View Events" to fetch and display all logged events.

---

## **Real-Time Updates**
Enable real-time logging with WebSocket:
1. Use a WebSocket client like `wscat`:
   ```bash
   wscat -c ws://localhost:5000
   ```
2. Monitor real-time event streams.

---

## **Future Enhancements**
- Implement a dashboard for better event visualization.
- Add support for distributed logging.
- Enhance real-time features with client-side integration.

---

## **Contributing**
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your branch.
5. Create a pull request.

---

## **License**
This project is licensed under the MIT License.
 
