import { getListOfCharactersByPage } from '../../Api/getListOfCharactersByPage';

export const getUniqueFilterValues = async (numberOfPages) => {
  const promises = [];
  let count = 0;

  while (count <= numberOfPages) {
    promises.push(getListOfCharactersByPage(count));
    count++;
  }

  try {
    const dataCharactersAll = await Promise.all(promises);
    const dataCharactersAllFlat = dataCharactersAll.flat();
    const uniqueFilters = {
      status: [
        ...new Set(dataCharactersAllFlat.map((item) => item.status))
      ].sort(),
      gender: [
        ...new Set(dataCharactersAllFlat.map((item) => item.gender))
      ].sort(),
      species: [
        ...new Set(dataCharactersAllFlat.map((item) => item.species))
      ].sort(),
      name: [...new Set(dataCharactersAllFlat.map((item) => item.name))].sort(),
      type: [...new Set(dataCharactersAllFlat.map((item) => item.type))]
        .map((value) => (value === '' ? 'Unknown' : value))
        .sort()
    };

    return uniqueFilters;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};
