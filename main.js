let apiKey = "fc1fef96";

let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let form = document.querySelector("#search-form");

const getData = async (request) => {
  const response = await fetch(
    `https://omdbapi.com/?s=${request}&page=1&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log(data.Search);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(searchInput.value);
});
