const request = require("request");

const catApi = "https://api.thecatapi.com/v1/breeds/search?q=";
const breedName = process.argv[2];

if (!breedName) {
  console.log("Please provide a breed Name");
  process.exit(1);
}

const fetchBreedData = (breedName) => {
  request(`${catApi}${breedName}`, (error, response, body) => {
    if (error) {
      console.error("Error fetching breed data:", error);
      return;
    }

    if (response.statusCode !== 200) {
      console.error("Unexpected status code:", response.statusCode);
      return;
    }

    const data = JSON.parse(body);
    if (data.length === 0) {
      console.log(`Breed ${breedName} not found.`);
    } else {
      const firstBreed = data[0];
      console.log("Description of the first breed:");
      console.log(firstBreed.description);
    }
  });
};

fetchBreedData(breedName);
