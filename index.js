document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://www.carboninterface.com/api/v1/estimates";
    const apiKey = "Bearer FKLvfXlmZBiSOLU9c46dQ"; 

    // Function to fetch carbon emissions data from the Carbon Interface API
    function fetchCarbonEmissions(activity, parameters) {
        const urlParams = new URLSearchParams(parameters);
        fetch(`${apiUrl}?type=${activity}&${urlParams}`, {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            displayResult(activity, data);
        })
        .catch(error => {
            console.error('Error fetching carbon emissions:', error);
        });
    }

    // Function to display result in a box
    function displayResult(activity, data) {
        console.log(data); 
        const emissions = data.data.attributes.carbon_g;
        const resultBox = document.createElement('div');
        resultBox.classList.add('result-box');
        resultBox.textContent = `Estimated CO2 emissions for ${activity}: ${emissions.toFixed(2)} grams`;
        document.getElementById('emissions-result').innerHTML = ''; // Clear previous result
        document.getElementById('emissions-result').appendChild(resultBox);
    }
    

    // Event listeners for different activities
    const calculateDrivingBtn = document.getElementById('calculateDriving');
    if (calculateDrivingBtn) {
        calculateDrivingBtn.addEventListener('click', function () {
            fetchCarbonEmissions('transportation', { distance_unit: 'kilometre', distance_value: 50, fuel_type: 'petrol' });
        });
    }

    const calculateCyclingBtn = document.getElementById('calculateCycling');
    if (calculateCyclingBtn) {
        calculateCyclingBtn.addEventListener('click', function () {
            fetchCarbonEmissions('transportation', { distance_unit: 'kilometre', distance_value: 10, fuel_type: 'bicycle' });
        });
    }

    const calculateWalkingBtn = document.getElementById('calculateWalking');
    if (calculateWalkingBtn) {
        calculateWalkingBtn.addEventListener('click', function () {
            fetchCarbonEmissions('transportation', { distance_unit: 'kilometre', distance_value: 5, fuel_type: 'walk' });
        });
    }
});
