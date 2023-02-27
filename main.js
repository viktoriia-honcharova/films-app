let apiKey = "fc1fef96";

let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let form = document.querySelector("#search-form");
let films = document.querySelector("#filml-list");
let modalDiv = document.querySelector(".modal");
let close = document.querySelector("#close");

function openModal() {
  document.querySelector(".modal-container").style.backgroundColor =
    "#000000c7";
  document.querySelector(".modal-container").style.zIndex = "3";
  modalDiv.style.top = `${(window.innerHeight - 800) / 2}px`;
  modalDiv.style.left = `${(window.innerWidth - 1000) / 2}px`;
  modalDiv.style.display = "block";
}

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener("touchmove", preventDefault, wheelOpt);
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

const getData = async (request) => {
  films.innerHTML = "";

  const response = await fetch(
    `https://omdbapi.com/?s=${request}&page=1&apikey=${apiKey}`
  );
  const data = await response.json();

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

  for (let i = 0; i < data.Search.length; i++) {
    document
      .querySelectorAll(".btn-details")
      [i].addEventListener("click", function () {
        window.scroll(0, 0);
        openModal();
        disableScroll();

        filmDetails(data.Search[i].imdbID);
      });
  }
};

const filmDetails = async (request) => {
  const response = await fetch(
    `https://omdbapi.com/?i=${request}&page=1&apikey=${apiKey}`
  );
  const data = await response.json();

  let retings = "";
  for (let i = 0; i < data.Ratings.length; i++) {
    retings += `<p>${data.Ratings[i].Source} ${data.Ratings[i].Value}</p>`;
  }

  document.querySelector("#modal-film").innerHTML = `
  <div class="col-4">
    <img
      src=${data.Poster}
      class="modal-img"
    />
  </div>
  <div class="col-8">
    <h2 class="modal-name">${data.Title}</h2>
    <p class="modal-plot">${data.Plot}</p>
    <p><strong>Written by: </strong>${data.Writer}</p>
    <p><strong>Directed by: </strong>${data.Director}</p>
    <p><strong>Starring: </strong>${data.Actors}</p>
    <p><strong>BoxOffice: </strong>${data.BoxOffice}</p>
    <p><strong>Awards: </strong>${data.Awards}</p>
    <p><strong>Ratings: </strong>${retings}</p>
  </div>
  `;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(searchInput.value);
});

close.addEventListener("click", function () {
  enableScroll();
  modalDiv.style.display = "none";
  document.querySelector(".modal-container").style.backgroundColor = "#fff";
  document.querySelector(".modal-container").style.zIndex = "-1";
});
