const request = require("request");

const catApi = "https://api.thecatapi.com/v1/breeds/search?q=";



const fetchBreedDescription = (breedName, callback) => {
  if (!breedName) {
    return callback("Please provide a breed Name", null);
  }
  request(`${catApi}${breedName}`, (error, response, body) => {
    if (error) {
      return callback(`Error fetching breed data: ${error}`, null);
    }
    if (response.statusCode !== 200) {
      return callback(`Unexpected status code: ${response.statusCode}`, null);
    }

    const data = JSON.parse(body);
    if (data.length === 0) {
      return callback(`Breed '${breedName}' not found.`, null);
    } else {
      const firstBreed = data[0];
      return callback(null, firstBreed.description);
    }
  });
};



module.exports = { fetchBreedDescription };