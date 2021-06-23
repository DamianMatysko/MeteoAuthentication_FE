import {User} from './user';

export class Station {
  public id: number;
  public title: string;
  public destination: string;
  public modelDescription: string;
  public registrationTime: string;
  public phone: number;
  public user: User;
}
