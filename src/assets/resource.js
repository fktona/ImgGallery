export const resources = async (resourceName, queryParams = {}) => {
  const apiKey = "39526563-a27e0ab0ad52015c5133c3a30";
  const callbackName = "processPixabayData"; // Define a callback function name
  const script = document.createElement("script");

  // Define the URL for the Pixabay API with the callback parameter
  script.src = `https://pixabay.com/api/?key=${apiKey}&q=${ new URLSearchParams(queryParams.q ,)}&callback=${callbackName}`;

  
  // Create a Promise to handle the JSONP response
  return new Promise((resolve, reject) => {
    // Define the callback function to handle the JSONP response
    window[callbackName] = function (data) {
      // Clean up by removing the script element and the callback function
      delete window[callbackName];
      document.head.removeChild(script);

      // Resolve the Promise with the data
      resolve(data);
    };

    // Append the script element to the document to initiate the JSONP request
    script.onerror = function (error) {
      // Clean up and reject the Promise in case of an error
      delete window[callbackName];
      document.head.removeChild(script);
      reject(error);
    };

    // Append the script element to the document to initiate the JSONP request
    document.head.appendChild(script);
  });
};

// export const searchResult = async (queryParams = {}) => {
//   try {
//     const data = await resources("api", queryParams); // Use "api" as the resource name for Pixabay API
//     return data;
//   } catch (error) {
//     console.error(`Error fetching search results:`, error);
//     throw error;
//   }
// };

export const searchResult = async (queryParams = {} ,) => {
  try {
    // Merge the provided queryParams with the "per_page" parameter set to 24
    const updatedQueryParams = { ...queryParams , 
      per_page:24,
      page: 5,
    };

    const data = await resources("api", updatedQueryParams); // Use "api" as the resource name for Pixabay API
    return data;
  } catch (error) {
    console.error(`Error fetching search results:`, error);
    throw error;
  }
};