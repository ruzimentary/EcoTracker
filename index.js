document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.climatiq.io/data/v1/estimate";
    const apiKey = "Bearer JY2DYXFJTWMP6TN8NDT5SWSGB0F3";

    const form = document.getElementById('carbonForm');
    const resultsDiv = document.getElementById('results');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const electricity = parseFloat(document.getElementById('electricity').value);
            const gas = parseFloat(document.getElementById('gas').value);
            const car = parseFloat(document.getElementById('car').value);
            const train = parseFloat(document.getElementById('train').value);
            const flight = parseFloat(document.getElementById('flight').value);

            const selectedCountry = document.getElementById('country').value;

            console.log("Form submitted!");
            console.log("Electricity:", electricity);
            console.log("Gas:", gas);
            console.log("Car:", car);
            console.log("Train:", train);
            console.log("Flight:", flight);
            console.log("Selected Country:", selectedCountry);

            // Make API request to get data for the selected country
            fetch(apiUrl + `?country=${selectedCountry}`, {
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
});

function calculateEmissions(data, electricity, gas, car, train, flight) {
    // Calculate emissions based on the provided inputs
    // You need to implement this logic based on the data and input values
    // For now, I'll provide a placeholder calculation
    let emissions = electricity + gas + car + train + flight;
    return emissions;
}