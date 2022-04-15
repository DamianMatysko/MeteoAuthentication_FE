import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.getToken() != null;
  }

  logout(): void {
    this.tokenStorage.signOut();
  }
}
