let readings = [];

function generateData() {
  const temp = Math.floor(Math.random() * 10) + 25;
  const humidity = Math.floor(Math.random() * 20) + 50;
  const moisture = Math.floor(Math.random() * 40) + 30;

  const status = moisture < 40 ? "Dry" : "Normal";

  document.getElementById("temp").innerText = temp;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("moisture").innerText = moisture;


  const statusElement = document.getElementById("status");
  statusElement.innerText = status;

  if (status === "Dry") {
    statusElement.className = "status dry";
  } else {
    statusElement.className = "status moist";
  }

  const data = {
    temp,
    humidity,
    moisture,
    status
  };

  readings.unshift(data);
  if (readings.length > 10) {
    readings.pop();
  }

  updateTable();

  sendToBackend(data);
}

function updateTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  readings.forEach(r => {
    const row = `
            <tr>
                <td>${r.temp}</td>
                <td>${r.humidity}</td>
                <td>${r.moisture}</td>
                <td>${r.status}</td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

function sendToBackend(data) {
  fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log("Backend Response:", result);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}


