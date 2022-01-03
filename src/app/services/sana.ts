export class Sana {
  constructor(_id = "", suomi = "", englanti = "") {
    this._id = _id;
    this.suomi = suomi;
    this.englanti = englanti;
  }
  _id: string;
  suomi: string;
  englanti: string;
}
