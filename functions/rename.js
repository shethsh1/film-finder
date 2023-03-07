const axios = require("axios");

exports.handler = async (event) => {
  // Get the API key from the environment variable
  const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;
  // Get the page number from the query string
  const page = event.queryStringParameters.page || 1;
  // Construct the API URL with the key and page
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  // Make a GET request to the API and return the response
  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message,
    };
  }
};
