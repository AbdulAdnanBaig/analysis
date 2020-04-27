import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUrlService {

  constructor() { }

  geturlfunction(param) {
    let obj: any = {
      GET_USERS: environment.apiUrl + '/users',
    }
    return obj[param]
  }

}
