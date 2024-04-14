document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.climatiq.io/data/v1/estimate";
    const apiKey = "Bearer JY2DYXFJTWMP6TN8NDT5SWSGB0F3";

    const form = document.getElementById('carbonForm');
    const resultsDiv = document.getElementById('results');

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

            console.log("Form submitted!");
            console.log("Electricity:", electricity);
            console.log("Gas:", gas);
            console.log("Car:", car);
            console.log("Train:", train);
            console.log("Flight:", flight);

            fetchCarbonEmissions('electricity-grid', electricity, 'kWh');
            fetchCarbonEmissions('natural-gas', gas, 'm3');
            fetchCarbonEmissions('passenger-car', car, 'km');
            fetchCarbonEmissions('train-travel', train, 'km');
            fetchCarbonEmissions('air-travel', flight, 'km');
        });
    } else {
        console.error("Form element not found!");
    }
});

function fetchCarbonEmissions(activityId, value, unit) {
    const requestBody = JSON.stringify({
        emission_factor: {
            activity_id: activityId
        },
        parameters: {
            value: value,
            unit: unit
        }
    });

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data);
        const totalCarbon = calculateEmissions(data, value);
        displayResults(totalCarbon, resultsDiv);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
