export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this.setMarkup(data);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSerchDrop;
}
