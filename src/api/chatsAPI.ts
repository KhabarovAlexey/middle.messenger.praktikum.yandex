import HTTPTransport from 'core/HTTPTransport';
import { AddChatData, RemoveChatData, UsersData } from './types';

class ChatsAPI {
  private _chats: HTTPTransport;

  constructor() {
    this._chats = new HTTPTransport('chats');
  }

  getToken(chatID: string | number) {
    return this._chats.post(`token/${chatID}`, {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  addChat(data: AddChatData) {
    return this._chats.post('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  removeChat(data: RemoveChatData) {
    return this._chats.delete('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  getChatsList() {
    return this._chats.get('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUsers(id: string | number) {
    return this._chats.get(`${id}/users`, {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  addUsers(data: UsersData) {
    return this._chats.put('users', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }

  removeUsers(data: UsersData) {
    return this._chats.delete('users', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    });
  }
}

export default new ChatsAPI();
