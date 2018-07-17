import { Injectable } from '@angular/core';

@Injectable()
export class ImuConfigService {

  constructor() { }
  getBakend(endpoint) {
    return 'https://api.universalhealthcoin.com/' + endpoint;
  }

  getUserAvatar(username, size = 60) {
    return this.getBakend('user/avatar/' + username + '/' + size);
  }

  getSlackToken() {
    return '<update-slack-token>';
  }

}
