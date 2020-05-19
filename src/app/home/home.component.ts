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
  data: any = [];
  options: any;
  finalArray: any = [];
  payload: any = [];

  constructor(private appUrl: AppUrlService, private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.appService
      .getAll(this.appUrl.geturlfunction("GET_USERS"))
      .subscribe((users) => {
        console.log(users)
        this.loading = false;
        this.users = users;
      });
    this.test();
    this.treantTree();
    this.search = this.formBuilder.group({
      searchText: ['',]
    });
  }

  test() {
    this.options = {
      container: "#basic-example",

      connectors: {
        type: 'step'
      },
      node: {
        HTMLclass: 'nodeExample1'
      }
    }
    // this.formLoop();
    this.payload = {
      text: { name: "Parent node" },   // The parent Node
      children: [ //followed by the first level of children
        {
          text: { name: "First child" }
        },
        {
          text: { name: "Second child" },  // second node in the tree
          children: [  // nested children for the second node
            {
              text: { name: "second sub child 1" }, // level 3 node branching from the second node
              children: [  // nested children
                {
                  text: { name: "second sub child 1a" }
                }
              ]
            },
            {
              text: { name: "second sub child 2" }
            },
            {
              text: { name: "second sub child 3" }
            },
          ]
        }
      ]
    }
  }

  treantTree() {
    this.chart_config = {
      chart: {
        container: "#basic-example",
        connectors: {
          type: 'bCurve'
        },
        node: { 
          // HTMLclass: 'nodeExample1',
          // collapsable: true
        },
      },
      nodeStructure: this.payload
    }
    return new Treant(this.chart_config);
  }
  fetch() {
    console.log('fetch is called')
  }
}
