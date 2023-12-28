

  // Graphs
  var ctx = document.getElementById('myChart')
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
  })

  let box = document.querySelector(".box");
 async ()=>{
  try {
    let response = await fetch("/getdata");
    
    if (!response.ok) {
      console.error(`Server returned an error: ${response.status}`);
      // Optionally, you can log the response text for more details
      console.error(await response.text());
      return;
    }

    let data = await response.json();
    // Update your box or handle the data as needed
    console.log("${data}")
    box.innerHTML = ` <tr>
                  <td>${data.RoomNumber
                  }</td>
                  <td>${data.RoomType}</td>
                  <td>${data.Price}</td>
                  
                </tr>
                <tr>
                  `;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};


