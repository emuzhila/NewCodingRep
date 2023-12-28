// Graphs
var ctx = document.getElementById('myChart');
// eslint-disable-next-line no-unused-vars
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    datasets: [{
      data: [
        15339,
        21345,
        18483,
        24003,
        23489,
        24092,
        12034
      ],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
});

let box = document.querySelector(".box");

(async () => {
  try {
    let response = await fetch("/getdata");

    if (!response.ok) {
      console.error(`Server returned an error: ${response.status}`);
      console.error(await response.text());
      return;
    }

    let data = await response.json();

    // Log the actual structure of the JSON response
    console.log("JSON response:", data);

    // Check if the response is an array with at least one object
    if (Array.isArray(data) && data.length > 0) {
      // Create a new row in the table for each object in the JSON response
      let rows = data.map((roomData) => {
        // Convert the JSON data to a string
        let jsonString = JSON.stringify(roomData, null, 2);

        // Create a row for the current object
        return `
          <tr>
            <td>${roomData.RoomNumber}</td>
            <td>${roomData.RoomType}</td>
            <td>${roomData.Price}</td>
          
          </tr>`;
      });

      // Update your box or handle the data as needed
      box.innerHTML = rows.join('');
    } else {
      console.error("Invalid data structure in the JSON response");
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
})();


