export const getResultMock = (id?: number) => ({
  id: id || Math.random(),
  name: 'Gaia',
  status: 'Alive',
  species: 'unknown',
  type: 'Planet',
  gender: 'Female',
  origin: {
    name: 'Gaia1',
    url: 'https://rickandmortyapi.com/api/location/106',
  },
  location: {
    name: 'Gaia2',
    url: 'https://rickandmortyapi.com/api/location/106',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/662.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/40'],
  url: `https://rickandmortyapi.com/api/character/${id || Math.random()}`,
  created: '2020-08-13T11:43:23.485Z',
});
