import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  ngOnInit(): void {
  }
  constructor(private router: Router, private authService: AuthService){}


  public goTo(route: string) {
    this.router.navigate([route]);
  }
  logout(){
    this.authService.logout();
  }
}
