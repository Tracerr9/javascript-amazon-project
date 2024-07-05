/*let data = []

fetch('../backend/data.json').then((response) => {
  return response.json()
}).then((productsData) => {
  data = productsData;
  console.log(productsData);
  console.log(data)
  generateChart(data)
});



function generateChart(data) {
  console.log(data[1].retur)
  const saleChart = new Chart(
    document.getElementById('myChart'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.bulan),
        datasets: [
         // {
           // label: 'Penjualan',
            //data: data.map(row => row.penjualan)
          //}, 
          {
            label: 'Retur',
            data: data.map(row => row.retur)
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  ); 
}
*/

function generateChart(data) {
  const saleChart = new Chart(
    document.getElementById('myChart'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.bulan), // Mapping months for x-axis labels
        datasets: [
          {
            label: 'Penjualan',
            data: data.map(row => row.penjualan), // Sales data
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: Color for sales bars
            borderColor: 'rgba(75, 192, 192, 1)', // Optional: Border color for sales bars
            borderWidth: 1
          },
          {
            label: 'Retur',
            data: data.map(row => row.retur), // Returns data
            backgroundColor: 'rgba(153, 102, 255, 0.2)', // Optional: Color for returns bars
            borderColor: 'rgba(153, 102, 255, 1)', // Optional: Border color for returns bars
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Ensures y-axis starts at zero
          }
        }
      }
    }
  ); 
}

// Sample data array
let data = [
  {
    bulan: "Januari",
    penjualan: 20000000,
    retur: 0
  },
  {
    bulan: "Februari",
    penjualan: 22000000,
    retur: 2000000
  },
  {
    bulan: "Maret",
    penjualan: 19000000,
    retur: 9000000
  },
  {
    bulan: "April",
    penjualan: 21000000,
    retur: 2000000
  },
  {
    bulan: "Mei",
    penjualan: 29000000,
    retur: 8000000
  }
];

// Call the function to generate the chart with the provided data
generateChart(data);


