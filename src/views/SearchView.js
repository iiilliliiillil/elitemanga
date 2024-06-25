import { getQuery } from "../model";
import Views from "./Views";
searchBar = document.querySelector("#search");
searchDrop = document.querySelector(".drop");

class SearchView extends Views {
  _data;

  smartSearch = async function () {
    try {
      if (!searchBar.value) {
        searchDrop.style.height = 0;
        searchDrop.innerHTML = "";
        return;
      }

      const data = getQuery(searchBar.value);
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
}

export default new SearchView();
