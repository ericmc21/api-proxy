const fetch = require("node-fetch");
const { config } = require("dotenv");

config();

exports.handler = async function (event, context) {
  const { httpMethod: method, headers, body, path, rawQuery, rawUrl } = event;
  const url = new URL(rawUrl);

  // Split the pathname by '/' and get the last segment
  const segments = url.pathname.split("/");
  const infer_segment = segments[segments.length - 1];

  const request_url = `https://api.infermedica.com/v3/${infer_segment}?${rawQuery}`;
  console.log(request_url);

  // Log the body for debugging

  // Set up options for the fetch call
  const options = {
    method,
    headers: {
      "content-type": "application/json",
      "App-Id": process.env.APP_ID,
      "App-Key": process.env.APP_KEY,
    },
    body: body,
  };

  try {
    // Fetch data from the external API
    const response = await fetch(request_url, options);

    const data = await response.json();

    // Return the response data
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Handle any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
