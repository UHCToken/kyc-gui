import {Client} from './client';

export class Project {
  id: number = 0;
  name: string = '';
  apiToken: string = '';
  client: Client;
  description: string = '';
  fileURL: string = '';
  whitePaper: string = '';
  welcomeMessage: string = '';
  website: string = '';
  awsAccessKeyId: '';
}
