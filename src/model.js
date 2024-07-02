import { async } from "regenerator-runtime";
import { MANGA_API } from "./config";
import { MANGA_SEARCH } from "./config";
import { getJSON } from "./helper";

export const state = {
  title: {},

  search: {
    query: "",
    results: [],
  },
};

export const getTitleData = async function (e) {
  try {
    const data = await getJSON(`${MANGA_API}${e}`);
    const result = data.data;

    state.title = {
      id: result.mal_id,
      title: result.title,
      japTitle: result.title_japanese,
      genres: result.genres.map((e) => e.name).join(", "),
      image: result.images.jpg.image_url,
      description: result.synopsis,
      volumes: result.volumes,
      chapters: result.chapters,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getQuery = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`https://api.jikan.moe/v4/manga?q=${query}&sfw`);
  } catch (err) {
    console.log(err);
  }
};
