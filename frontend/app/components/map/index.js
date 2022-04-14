import "./style.pcss";
import Collection from "../../js/collection";
import {getJS} from "../../js/utils/getJS";

export class Map {
  constructor() {

  }
}

export default class MapsCollection extends Collection {
  static instance = "[data-js-map]";

  constructor() {
    super();
    this.load();
  }

  static urlAPI = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU";

  init() {

  }

  load() {
    if (typeof window.ymaps === "function") {
      this.init();
    } else {
      getJS({src: MapsCollection.urlAPI}).then(res => this.init(), err => console.debug(err));
    }
  }
}