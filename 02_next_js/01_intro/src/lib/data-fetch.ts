// this is a helper function to fetch data from the backend
// we will refactor it and make it reusable, so that
// we don't need to write try/catch blocks everywhere

async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default dataFetch;
