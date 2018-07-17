// globals.ts
import { Injectable } from '@angular/core';
import {Project} from './app/models/project';

@Injectable()
export class Globals {
  description: string = 'UhX, a public benefit corporation, is reinventing healthcare finance and payment for everyone utilizing cutting-edge blockchain ' +
    'technology and leveraging the explosive growth of cryptocurrencies to facilitate the effective delivery and fair payment of health services worldwide.';
  website: string = 'https://www.universalhealthcoin.com/';
  name: string =  'Universal Healthcoin';
  welcomeMessage: string =  'Welcome to the KYC (Know Your Customer) page of UhX | the Universal Healthcoin.';
  url: string = 'https://kyc.universalhealthcoin.com';
  fileURL: string = this.url + '/assets/img/logo.png';
  apiToken: string = '768549b3-36ec-4797-8717-e27e9337705a';
  whitePaper: string = 'http://www.universalhealthcoin.com/wp-content/uploads/uhx-white-paper-v3.0-final-1.pdf';

  getProject() {
    let project = new Project();
    project.name = this.name;
    project.fileURL = this.fileURL;
    project.description = this.description;
    project.website = this.website;
    project.whitePaper = this.whitePaper;
    project.welcomeMessage = this.welcomeMessage;
    project.apiToken = this.apiToken;
    return project;
  }

}
