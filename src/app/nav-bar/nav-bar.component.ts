import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    if (this.tokenStorage.getToken() != null){
      return true;
    }
    return false;
  }

  logout() {
    this.tokenStorage.signOut();
  }
}
