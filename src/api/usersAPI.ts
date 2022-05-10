import HTTPTransport from 'core/HTTPTransport';
import { SearchUserData, UserProfile, UserPassword } from './types';

class UsersAPI {
  private _users: HTTPTransport;

  constructor() {
    this._users = new HTTPTransport('user');
  }

  searchUserByLogin(data: SearchUserData) {
    return this._users.post('search', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  changeUserProfile(data: UserProfile) {
    return this._users.put('profile', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  changeUserAvatar(data: FormData) {
    return this._users.put('profile/avatar', {
      includeCredentials: true,
      data,
    });
  }

  changeUserPassword(data: UserPassword) {
    return this._users.put('password', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  getUserById(id: string) {
    return this._users.get(id, {
      includeCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
  }
}

export default new UsersAPI();
