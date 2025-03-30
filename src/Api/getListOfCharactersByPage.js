import axios from 'axios';

export const getListOfCharactersByPage = async (pageNumber) => {
  const res = await axios.post('https://rickandmortyapi.com/graphql', {
    query: `
        query {
          characters(page: ${pageNumber}) {
            results {
              status
              gender
              species
              name
              type
            }
          }
        }
      `
  });

  return res.data.data.characters.results;
};
