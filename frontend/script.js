const apiUrl = "http://localhost:5001/api/events";
const eventList = document.getElementById("eventList");

document.getElementById("logEvent").addEventListener("click", async () => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType: "user_login",
      timestamp: new Date(),
      sourceAppId: "APP001",
      payload: { userId: "123", ipAddress: "192.168.1.1" },
    }),
  });
  const data = await response.json();
  alert(data.message);
});

document.getElementById("viewEvents").addEventListener("click", async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  eventList.innerHTML = data.data
    .map((event) => `<li>${event.eventType} - ${event.timestamp}</li>`)
    .join("");
});
