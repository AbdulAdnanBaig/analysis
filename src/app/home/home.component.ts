import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { ViewEncapsulation } from '@angular/core'

import { User } from "@app/_models";
import { AuthenticationService, AppService } from "@app/_services";
import { AppUrlService } from "@app/_services/app-url.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var Treant: any;

@Component({ 
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss', '../../assets/js/Treant.css'] 
})
export class HomeComponent {
  search: FormGroup;
  loading = false;
  users: User[];
  chart_config: any;

  constructor(private appUrl: AppUrlService, private appService: AppService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loading = true;
    this.appService
      .getAll(this.appUrl.geturlfunction("GET_USERS"))
      .subscribe((users) => {
          console.log(users)
        this.loading = false;
        this.users = users;
      });
      this.treantTree();
      this.search = this.formBuilder.group({
        searchText: ['',]
    });
  }

  treantTree() {
    var config = {
      container: "#basic-example",

      connectors: {
        type: 'step'
      },
      node: {
        HTMLclass: 'nodeExample1'
      }
    },
      ceo = {
        text: {
          name: "Mark Hill",
          title: "Chief executive officer",
          // contact: "Tel: 01 213 123 134",
        },
      },

      cto = {
        parent: ceo,
        text: {
          name: "Joe Linux",
          title: "Chief Technology Officer",
        },
        stackChildren: true,
      },
      cbo = {
        parent: ceo,
        stackChildren: true,
        text: {
          name: "Linda May",
          title: "Chief Business Officer",
        },
      },
      cdo = {
        parent: ceo,
        text: {
          name: "John Green",
          title: "Chief accounting officer",
          // contact: "Tel: 01 213 123 134",
        },
      },
      cio = {
        parent: cto,
        text: {
          name: "Ron Blomquist",
          title: "Chief Information Security Officer"
        },
      },
      ciso = {
        parent: cto,
        text: {
          name: "Michael Rubin",
          title: "Chief Innovation Officer",
          // contact: { val: "we@aregreat.com", href: "mailto:we@aregreat.com" }
        },
      },
      cio2 = {
        parent: cdo,
        text: {
          name: "Erica Reel",
          title: "Chief Customer Officer"
        },
        // link: {
        //   href: "http://www.google.com"
        // },
      },
      ciso2 = {
        parent: cbo,
        text: {
          name: "Alice Lopez",
          title: "Chief Communications Officer"
        },
      },
      ciso3 = {
        parent: cbo,
        text: {
          name: "Mary Johnson",
          title: "Chief Brand Officer"
        },
      },
      ciso4 = {
        parent: cbo,
        text: {
          name: "Kirk Douglas",
          title: "Chief Business Development Officer"
        },
      }

    this.chart_config = [
      config,
      ceo,
      cto,
      cbo,
      cdo,
      cio,
      ciso,
      cio2,
      ciso2,
      ciso3,
      ciso4
    ];
    return new Treant(this.chart_config);
  }
  fetch(){
  }
}
