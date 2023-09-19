export const resources = async (resourceName, queryParams = {}) => {
  const apiKey = "39526563-a27e0ab0ad52015c5133c3a30";
  const endpoint = `GEThttps://pixabay.com/api/${resourceName}?${new URLSearchParams(
    queryParams,
  )}&api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch resource: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${resourceName}:`, error);
    throw error;
  }
};


export const searchResult = async (queryParams = {}) => {
  await resources("search/movie", queryParams);
};
