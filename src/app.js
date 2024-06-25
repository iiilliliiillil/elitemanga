import { async } from "regenerator-runtime";
import * as model from "./model.js";
import TitleView from "./views/TitleView.js";
import SearchView from "./views/SearchView.js";

const searchBar = document.querySelector("#search");
const searchDrop = document.querySelector(".drop");

if (module.hot) {
  module.hot.accept();
}

model.getQuery();
const smartSearch = async function () {
  try {
    if (!searchBar.value) {
      searchDrop.style.height = 0;
      searchDrop.innerHTML = "";
      return;
    }

    const response = await fetch(
      `https://api.jikan.moe/v4/manga?q=${searchBar.value}&sfw`
    );

    const data = await response.json();
    if (!data.data) throw new Error("No results");
    const searchNAmes = data.data
      .map((e) => {
        if (e.title.length > 40) return e.title.slice(0, 40) + "...";
        return e.title;
      })
      .slice(0, 5);
    const searchIDs = data.data.map((e) => e.mal_id).slice(0, 5);
    searchDrop.innerHTML = "";
    searchNAmes.forEach((e) => {
      const resElem = document.createElement("ul");
      resElem.innerHTML = e;
      searchDrop.appendChild(resElem);
    });

    searchIDs.map((e, i) => (searchDrop.children[i].data = e));

    if (!searchDrop.children[0]) searchDrop.style.height = 0;

    let resultstHeight =
      searchDrop.children[0].offsetHeight * searchNAmes.length;

    searchDrop.style.height = resultstHeight + "px";
  } catch (e) {
    console.log(e);

    if (e.message === "No results") {
      searchDrop.style.height = 0;
      const errorElem = document.createElement("ul");
      errorElem.innerHTML = e.message;
      searchDrop.appendChild(errorElem);

      return;
    }
  }
};

const showTitle = async function (dat) {
  try {
    await model.getTitleData(dat);
    TitleView.render(model.state.title);
  } catch (e) {
    console.log(e);
  }
};

searchBar.addEventListener("input", smartSearch);
searchDrop.addEventListener("click", function (e) {
  showTitle(e.target.data);
  console.log(e.target.data);
  searchDrop.style.height = 0;
  searchBar.value = "";
});
