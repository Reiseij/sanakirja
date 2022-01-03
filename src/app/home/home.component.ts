import { Component } from "@angular/core";
import { SanaService } from "../services/sana.service";
import { Sana } from "../services/sana";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
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
    this.sanaService.getSanat().subscribe((res) => {
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
