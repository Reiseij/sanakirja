import { Component } from "@angular/core";
import { SanaService } from "../services/sana.service";
import { Sana } from "../services/sana";
import { Router } from "@angular/router";

@Component({
  selector: "app-home2",
  templateUrl: "./home2.component.html",
  styleUrls: ["./home2.component.css"],
})
export class Home2Component {
  constructor(private sanaService: SanaService, private router: Router) {}

  sanacredentials = {
    _id: "",
    suomi: "",
    englanti: "",
  };

  ngOnInit() {
    this.getSanat();
  }

  getSanat() {
    this.sanaService.getSanatE().subscribe((res) => {
      this.sanaService.sanat = res as Sana[];
    });
  }
  deleteSana(_id: string) {
    this.sanaService.deleteSana(_id).subscribe((res) => {
      this.getSanat();
      this.sanaService.selectedSana = new Sana();
    });
  }

  postSana() {
    this.sanaService.postSana(this.sanacredentials).subscribe(
      () => {
        this.getSanat();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
