import {JwtPayload} from '../app/models/jwt';

export class JwtHelper {
  public static parse(token: string): JwtPayload | null {
    try {
      console.log(token);
      return JSON.parse(atob(token.split('.')[1]));
      //return JSON.parse(token);
    } catch (e) {
      return null;
    }
  }

}
