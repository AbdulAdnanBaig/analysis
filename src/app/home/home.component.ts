import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@app/_models";
import { AuthenticationService, AppService } from "@app/_services";
import { AppUrlService } from "@app/_services/app-url.service";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
  loading = false;
  users: User[];

  constructor(private appUrl: AppUrlService, private appService: AppService) {}

  ngOnInit() {
    this.loading = true;
    this.appService
      .getAll(this.appUrl.geturlfunction("GET_USERS"))
      .subscribe((users) => {
          console.log(users)
        this.loading = false;
        this.users = users;
      });
  }
}
