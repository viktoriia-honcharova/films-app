let apiKey = "fc1fef96";

let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let form = document.querySelector("#search-form");
let films = document.querySelector("#filml-list");

const getData = async (request) => {
  films.innerHTML = "";

  const response = await fetch(
    `https://omdbapi.com/?s=${request}&page=1&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log(data.Search);

  for (let i = 0; i < data.Search.length; i++) {
    films.innerHTML += `
    <div class="col-3 film-block">
          <img
            src="${data.Search[i].Poster}"
            class="poster"
          />
          <h2 class="film-name">${data.Search[i].Title}</h2>
          <p class="film-year">${data.Search[i].Year}</p>
          <button type="button" class="btn btn-success btn-details">
            More details
          </button>
        </div>
    `;
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(searchInput.value);
});
