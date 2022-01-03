import { Component, OnInit } from "@angular/core";
import { SanaService } from "../services/sana.service";
import { Sana } from "../services/sana";
import { Router } from "@angular/router";

@Component({
  selector: "app-haku",
  templateUrl: "./haku.component.html",
  styleUrls: ["./haku.component.css"],
})
export class HakuComponent implements OnInit {
  searchText;
  constructor(private sanaService: SanaService, private router: Router) {}

  ngOnInit() {
    this.getSanat();
  }
  getSanat() {
    this.sanaService.getSanat().subscribe((res) => {
      this.sanaService.sanat = res as Sana[];
    });
  }
}
