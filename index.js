const form = document.getElementById('carbonForm');
const resultsDiv = document.getElementById('results');

const apiUrl = "https://api.climatiq.io/estimate";
const apiKey = "Bearer JY2DYXFJTWMP6TN8NDT5SWSGB0F3";

function displayResults(totalCarbon, resultsDiv) {
    console.log("Total Carbon:", totalCarbon);
    resultsDiv.innerHTML = `<p>Total Carbon Footprint: ${totalCarbon.toFixed(2)} kg CO2e</p>`;
    console.log("Results displayed!");
}

function calculateEmissions(data, electricity, gas, car, train, flight) {
    let emissions = electricity + gas + car + train + flight; // Placeholder calculation
    return emissions;
}


if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const electricity = parseFloat(document.getElementById('electricity').value);
        const gas = parseFloat(document.getElementById('gas').value);
        const car = parseFloat(document.getElementById('car').value);
        const train = parseFloat(document.getElementById('train').value);
        const flight = parseFloat(document.getElementById('flight').value);

        const selectedRegion = document.getElementById('region').value;

        console.log("Form submitted!");
        console.log("Electricity:", electricity);
        console.log("Gas:", gas);
        console.log("Car:", car);
        console.log("Train:", train);
        console.log("Flight:", flight);
        console.log("Selected Region:", selectedRegion);

        // Make API request to get data for the selected region
        fetch(apiUrl + `?region=${selectedRegion}`, {
            method: 'POST',
            headers: {
                'Authorization': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            // Calculate emissions based on API response and user input
            const totalCarbon = calculateEmissions(data, electricity, gas, car, train, flight);
            console.log('Total Carbon:', totalCarbon);
            // Display results
            displayResults(totalCarbon, resultsDiv);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
} else {
    console.error("Form element not found!");
}
