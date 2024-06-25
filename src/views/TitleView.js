import Views from "./Views";

class TitleView extends Views {
  _data;
  _parentElement = document.querySelector(".cartoon_container");
  _serchDropElement = document.querySelector(".drop");

  _clearInput() {
    document.querySelector("#search").value = "";
  }

  setMarkup(data) {
    return `
      <div class="info">
        <image src="${data.image}" class="cartoon_frame"></image>
          <div class="txt_info">
          <h1 class="title_name">${data.title}</h1>
          <div class="bord"></div>
          <h2 class="sub_info">${data.japTitle}</h2>
          <h3 class="sub_info">${data.genres} </h3>
          <h3 class="sub_info">${
            data.volumes
              ? `${data.volumes} volumes, ${data.chapters} chapters`
              : "Oneshot"
          }</h3>
          <h4 class="synopsis">${data.description}</h4>
          </div>
          </div>
        </div>
      </div>`;
  }
}

export default new TitleView();
