const axios = require('axios');
const captainModel = require('../models/captain-model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.MAP_API;
    const url = `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(address)}&language=hi&api_key=${apiKey}`;
    try {
        const response = await axios.get(url);

        if (response.data.geocodingResults && response.data.geocodingResults.length > 0) {
            const location = response.data.geocodingResults[0].geometry.viewport.southwest;
            return {
                ltd: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error(`Unexpected response structure: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        
        console.error('Error in getAddressCoordinate:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.MAP_API;

    // Correct the endpoint and use latitude/longitude coordinates
    const url = `https://api.olamaps.io/routing/v1/distanceMatrix/basic?origins=${origin}&destinations=${destination}&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.rows && response.data.rows.length > 0) {
            const results = response.data.rows.map((row) => {
                return row.elements.map((element) => {
                  
                    
                    if (element.duration && element.distance) {
                        // Convert duration from seconds to hours and minutes
                        const durationInMinutes = Math.floor(element.duration / 60);
                        const hours = Math.floor(durationInMinutes / 60);
                        const minutes = durationInMinutes % 60;

                        // Convert distance from meters to kilometers
                        const distanceInKm = (element.distance / 1000).toFixed(2);
                        // const distanceIncm = (element.distance * 1000).toFixed(2);


                        return {
                            distance: {
                                "text": `${distanceInKm} km`,
                                "value": element.distance,
                            },
                            duration: {
                                "text": hours?`${hours} hr ${minutes} min`:`${durationInMinutes} min`,
                                "value": element.duration,
                            },
                        };
                    } else {
                        return { error: 'No route found' };
                    }
                });
            });

            return results;
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (err) {
        console.error('Error in getDistanceTime:', err.message);
        throw err;
    }
};



module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.MAP_API; // Fetch API key from environment variable

    const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        

        if (response.data.status && response.data.status.toLowerCase() === 'ok') {
            return response.data.predictions;
        } else {
            throw new Error(`Unexpected response structure: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        if (error.response) {
            
            console.error('Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}