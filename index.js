document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.climatiq.io/data/v1/estimate";
    const apiKey = "Bearer THYMBSB5JJ444GQSRB6Z8HTK686G";

    const form = document.getElementById('carbonForm');
    const resultsDiv = document.getElementById('results');

    console.log("Form:", form);
    console.log("Results Div:", resultsDiv);
    
    // Add event listener to the form
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

        form.addEventListener('submit', function (event) {
            event.preventDefault();
        
            const selectedCountry = countrySelect.value;
            // You can proceed with your API request here
            form.addEventListener('submit', function (event) {
                event.preventDefault();
            
                const selectedCountry = countrySelect.value;
    
        // Make API request to get data for the selected country
        fetch(apiUrl + `?country=${selectedCountry}`, {
            method: 'GET',
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
            displayResults(totalCarbon);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
    
    function calculateEmissions(data, electricity, gas, car, train, flight) {
        // Calculate emissions based on the provided inputs
        // You need to implement this logic based on the data and input values
        // For now, I'll provide a placeholder calculation
        let emissions = electricity + gas + car + train + flight;
        return emissions;
    }
    
    // Function to display result in a box
function displayResult(activity, data) {
    console.log("Displaying result for activity:", activity);
    console.log("Received data:", data);
    const emissions = data.data.attributes.carbon_g;
    const resultBox = document.createElement('div');
    resultBox.classList.add('result-box');
    resultBox.textContent = `Estimated CO2 emissions for ${activity}: ${emissions.toFixed(2)} grams`;
    console.log("Result box:", resultBox); // Log the created result box
    document.getElementById('results').innerHTML = ''; // Clear previous result
    document.getElementById('results').appendChild(resultBox);
}

       
    
    // Array of all UN recognized countries
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    // Populate country dropdown list
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);

        function displayResults(totalCarbon) {
            console.log("Total Carbon:", totalCarbon);
            // Display the total carbon footprint
            resultsDiv.innerHTML = `<p>Total Carbon Footprint: ${totalCarbon.toFixed(2)} kg CO2e</p>`;
            console.log("Results displayed!");
        }
        
    });
})
    })
})
    