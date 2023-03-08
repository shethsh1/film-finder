const axios = require("axios");
const QueryString = require("querystring");

exports.handler = async (event) => {
  // Get the API key from the environment variable
  const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;
  console.log(apiKey);
  // Get the page number from the query string
  const endpoint = event.queryStringParameters.endpoint;
  // Construct the API URL with the key and page
  // console.log(event);
  const queryString = event.queryStringParameters;
  delete queryString["endpoint"];
  delete queryString["api_key"];
  const apiUrl = `https://api.themoviedb.org/3${endpoint}?${QueryString.stringify(
    queryString
  )}&api_key=${apiKey}`;
  console.log(apiUrl);
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
