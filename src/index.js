document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.carboninterface.com/v1/estimates";
    const apiKey = "Bearer FKLvfXlmZBiSOLU9c46dQ "; 
    // Function to calculate carbon emissions for different activities
    function calculateEmissions(activity, parameters) {
        // Make API call to Carbon Interface API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify({
                type: activity,
                ...parameters
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process API response
            console.log('Estimated CO2 emissions:', data.data.attributes.carbon_g, 'grams');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to track personal carbon footprint
    function trackCarbonFootprint(activityData) {
        // Save activity data to user's profile or database
        console.log('Activity data saved:', activityData);
    }

    // Function to compare environmental impacts of different activities
    function compareEnvironmentalImpacts(activity1, parameters1, activity2, parameters2) {
        // Make API calls for both activities
        Promise.all([
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                },
                body: JSON.stringify({
                    type: activity1,
                    ...parameters1
                })
            }),
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                },
                body: JSON.stringify({
                    type: activity2,
                    ...parameters2
                })
            })
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            // Process API responses and compare environmental impacts
            console.log('Environmental Impact Comparison:');
            console.log('Activity 1 - Estimated CO2 emissions:', data[0].data.attributes.carbon_g, 'grams');
            console.log('Activity 2 - Estimated CO2 emissions:', data[1].data.attributes.carbon_g, 'grams');
            if (data[0].data.attributes.carbon_g < data[1].data.attributes.carbon_g) {
                console.log('Activity 1 has a lower environmental impact.');
            } else if (data[0].data.attributes.carbon_g > data[1].data.attributes.carbon_g) {
                console.log('Activity 2 has a lower environmental impact.');
            } else {
                console.log('Both activities have the same environmental impact.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Example usage:
    // Calculate emissions for driving
    calculateEmissions('transportation', { distance_unit: 'kilometre', distance_value: 50, fuel_type: 'petrol' });

    // Track personal carbon footprint
    const activityData = { activity: 'driving', distance: 50, fuel_type: 'petrol' };
    trackCarbonFootprint(activityData);

    // Compare environmental impacts of driving vs. cycling
    compareEnvironmentalImpacts('transportation', { distance_unit: 'kilometre', distance_value: 50, fuel_type: 'petrol' }, 'transportation', { distance_unit: 'kilometre', distance_value: 10, fuel_type: 'bicycle' });

    // Event listener for button click
    document.getElementById('calculateButton').addEventListener('click', function() {
        calculateEmissions('transportation', { distance_unit: 'kilometre', distance_value: 50, fuel_type: 'petrol' });
    });

    // Event listener for form submission
    document.getElementById('carbonFootprintForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const activityData = {
            activity: formData.get('activity'),
            distance: formData.get('distance'),
            fuel_type: formData.get('fuel_type')
        };
        trackCarbonFootprint(activityData);
    });

    // Event listener for select box change
    document.getElementById('compareSelect').addEventListener('change', function(event) {
        const selectedValue = event.target.value;
        if (selectedValue === 'driving_vs_cycling') {
            compareEnvironmentalImpacts('transportation', { distance_unit: 'kilometre', distance_value: 50, fuel_type: 'petrol' }, 'transportation', { distance_unit: 'kilometre', distance_value: 10, fuel_type: 'bicycle' });
        } else if (selectedValue === 'other_activities') {
            // Add comparison logic for other activities
        }
    });
});
