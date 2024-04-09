document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.carboninterface.com/v1/estimates";
    const apiKey = "Bearer FKLvfXlmZBiSOLU9c46dQ"; // Replace 'YOUR_API_KEY_HERE' with your actual API key

    // Function to calculate carbon emissions for different activities
    function calculateEmissions(activity, parameters) {
        // Make API call to Carbon Interface API
        console.log("Making API call to calculate emissions...");
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
            console.log('API Response:', data);
            console.log('Estimated CO2 emissions:', data.data.attributes.carbon_g, 'grams');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to track personal carbon footprint
    function trackCarbonFootprint(activityData) {
        // Save activity data to user's profile or database
        console.log('Tracking personal carbon footprint...');
        console.log('Activity data:', activityData);
    }

    // Function to compare environmental impacts of different activities
    function compareEnvironmentalImpacts(activity1, parameters1, activity2, parameters2) {
        // Make API calls for both activities
        console.log('Comparing environmental impacts...');
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
            console.log('API Responses:', data);
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
});
