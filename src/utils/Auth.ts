import { Storage } from '@davidegheri/storage';

const storage = new Storage('localstorage');

export class Auth {

  static set token(jwt: string) {
    storage.set('gtsb_token', jwt);
  }

  static get token() {
    return storage.get('gtsb_token');
  }

  static isAuth(): boolean {
    return Boolean(this.token);
  }
}
