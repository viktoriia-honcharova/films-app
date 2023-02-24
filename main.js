let apiKey = "fc1fef96";

let searchBtn = document.querySelector("#search-btn");

const getData = async (request) => {
  const response = await fetch(
    `https://omdbapi.com/?s=${request}&page=1&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log(data.Search);
};

searchBtn.addEventListener("click", function () {
  getData("thor");
});
