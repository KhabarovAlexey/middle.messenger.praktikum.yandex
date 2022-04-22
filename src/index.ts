import { Block, renderDOM, registerComponent } from './core';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ProfilePage from './pages/profile';
import ChatPage from './pages/chat';
import { Error500, Error404 } from './pages/errors/errors';

import './app.css';

const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block };
};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

document.addEventListener('DOMContentLoaded', () => {
  switch (document.location.hash) {
    case '#login':
      renderDOM(LoginPage);
      break;
    case '#registration':
      renderDOM(RegistrationPage);
      break;
    case '#profile':
      renderDOM(ProfilePage);
      break;
    case '#chat':
      renderDOM(ChatPage);
      break;
    case '#404':
      renderDOM(Error404);
      break;
    case '#500':
      renderDOM(Error500);
      break;
    default:
      renderDOM(LoginPage);
      break;
  }
});
