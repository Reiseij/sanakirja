import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sana } from "./sana";

export interface Sanapayload {
  _id: string;
  suomi: string;
  englanti: string;
}

@Injectable({
  providedIn: "root",
})
export class SanaService {
  selectedSana: Sana;
  sanat: Sana[];

  constructor(private http: HttpClient) {
    this.selectedSana = new Sana();
  }
  getSanat() {
    return this.http.get(`http://localhost:3000/sanat`);
  }
  getSanatE() {
    return this.http.get(`http://localhost:3000/sanate`);
  }
  postSana(Sana: Sanapayload) {
    return this.http.post(`http://localhost:3000/sana`, Sana);
  }
  deleteSana(_id: string) {
    return this.http.delete(`http://localhost:3000/sana/${_id}`);
  }  
}
