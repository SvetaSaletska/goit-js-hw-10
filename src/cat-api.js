const URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const URL_IMG = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_wqSAuhSg76MdwtkPGGVKhyY2mxhvTo2ZPwApRhjlV958Akv6DiUBULuFYk8XzMqQ';

function fetchBreeds(){
  return fetch(`${URL_BREEDS}?api_key=${API_KEY}`)
  .then(resp => {
    if(!resp.ok){
      throw new Error(resp.status);
    }
    return resp.json()
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${URL_IMG}/${breedId}?api_key=${API_KEY}`)
  .then(resp => {
    if(!resp.ok){
      throw new Error(resp.status)
    }
    return resp.json()
  });
}

export {fetchBreeds, fetchCatByBreed};

