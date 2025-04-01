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
      status: [...new Set(dataCharactersAllFlat.map((item) => item.status))]
        .sort()
        .map((status) => ({
          value: status.toLowerCase(),
          label: status
        })),
      gender: [...new Set(dataCharactersAllFlat.map((item) => item.gender))]
        .sort()
        .map((gender) => ({
          value: gender.toLowerCase(),
          label: gender
        })),
      species: [...new Set(dataCharactersAllFlat.map((item) => item.species))]
        .sort()
        .map((species) => ({
          value: species.toLowerCase(),
          label: species
        }))
    };

    return uniqueFilters;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};
