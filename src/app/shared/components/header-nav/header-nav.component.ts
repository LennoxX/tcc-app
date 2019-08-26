import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.css"]
})
export class HeaderNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("auth/login");
  }
}
