import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_wqSAuhSg76MdwtkPGGVKhyY2mxhvTo2ZPwApRhjlV958Akv6DiUBULuFYk8XzMqQ";
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  catPic: document.querySelector('.cat-info-pict'),
  catDesc: document.querySelector('.cat-info-desc')
}

elements.select.addEventListener('change', onChangeSelect);

function renderSelect (breeds) {
  const markup = breeds
  .map(breed => {
     return `<option value = '${breed.reference_image_id}'>${breed.name}</option>`
  })
  .join('');
  elements.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
};

(function fetchBreedsRender () {
  elements.loader.classList.remove('unvisible');
  fetchBreeds()
  .then(breeds => renderSelect (breeds))
  .catch (error => {
    console.log(error);
    Notify.failure(
    'Ooops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    elements.loader.classList.add('unvisible');
    elements.select.classList.remove('unvisible');
  })
})();

function renderDesc (breed) {
  const picture = `<img class='cat-picture' src ='${breed.url}' alt = '${breed.id}'>`;
  const descript = `<h2 class='cat-info-desc-title'>${breed.breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
  <p class="cat-info-desc-temp"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
  elements.catPic.insertAdjacentHTML('beforeend', picture);
  elements.catDesc.insertAdjacentHTML('beforeend', descript);
}

function onChangeSelect(evt) {
  elements.loader.classList.remove('unvisible');
  elements.catPic.innerHTML = '';
  elements.catDesc.innerHTML = '';
  const breedId = evt.target.value;
  console.log('breedId:', breedId);
  fetchCatByBreed (breedId)
  .then(breed => renderDesc(breed))
  .catch (error => {
    console.log(error);
    Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => elements.loader.classList.add ('unvisible'));
}

