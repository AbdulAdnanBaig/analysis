import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    currentUser: User;
    menuList: any = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        this.setMenu();
    }
    setMenu(){
        this.menuList = [
            {
                state: 'home',
                title: 'Dashboard'
            }            
        ]
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}