import { UserService } from "./../../../core/services/user.service";
import { Usuario } from "./../../../pages/usuarios/shared/usuario.model";
import { Component, OnInit, AfterContentChecked } from "@angular/core";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.css"]
})
export class SideMenuComponent implements OnInit, AfterContentChecked {
  usuario: Usuario;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngAfterContentChecked(): void {
    this.usuario = this.userService.getInstance();
  }
  isAdmin() {
    if (this.usuario != null) return this.usuario.niveis.indexOf("ADMIN") != -1;
  }
}
