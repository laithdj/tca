import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private doc: Document
    ) { }

  ngOnInit(): void {
  }
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
  logout(): void{
    this.auth.logout({returnTo: this.doc.location.origin})
  }

  onCreateProfile(){
    this.auth.isAuthenticated$.subscribe(res=>{
      if(res){
        this.router.navigateByUrl("/profile");
      }else{
        this.auth.loginWithRedirect();
      }
    })
  }
}
