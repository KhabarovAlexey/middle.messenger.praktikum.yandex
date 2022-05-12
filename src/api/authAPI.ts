import HTTPTransport from 'core/HTTPTransport';
import { LoginData, SignupData } from './types';

class AuthAPI {
  private _auth: HTTPTransport;

  constructor() {
    this._auth = new HTTPTransport('auth');
  }

  login(data: LoginData) {
    return this._auth.post('signin', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  logout() {
    return this._auth.post('logout', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUser() {
    return this._auth.get('user', {
      includeCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
  }

  signUp(data: SignupData) {
    return this._auth.post('signup', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }
}

export default new AuthAPI();
