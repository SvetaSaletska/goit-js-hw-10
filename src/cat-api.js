import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_wqSAuhSg76MdwtkPGGVKhyY2mxhvTo2ZPwApRhjlV958Akv6DiUBULuFYk8XzMqQ";


const URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const URL_IMG = 'https://api.thecatapi.com/v1/images';
const API_KEY = 'live_wqSAuhSg76MdwtkPGGVKhyY2mxhvTo2ZPwApRhjlV958Akv6DiUBULuFYk8XzMqQ';

function fetchBreeds(){
  return fetch(`${URL_BREEDS}?key=${API_KEY}`).then(resp => {
    if(!resp.ok){
      throw new Error (resp.status);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${URL_IMG}/${breedId}?key=${API_KEY}`)
  .then(resp => {
    if(!resp.ok){
      throw new Error(resp.status)
    }
    return resp.json();
  });
};

export {fetchBreeds, fetchCatByBreed};

