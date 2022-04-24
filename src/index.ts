import { Block, registerComponent, renderDOM, Router, Store } from 'core';
import LoginPage from 'pages/login';
import RegistrationPage from 'pages/registration';
import ProfilePage from 'pages/profile';
import ChatPage from 'pages/chat';
import { Error500, Error404 } from 'pages/errors/errors';
import { defaultState } from 'store';
import { diffObjectsDeep } from 'utils/diffOjectsDeep';
import './app.css';
import { getScreenComponent } from 'utils/getScreenComponent';

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block };
};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router('#app');
  window.router = router;
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
      console.log(JSON.stringify(diffObjectsDeep.map(prevState, nextState)));
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page());
    }
  });

  router
    .use('/login', LoginPage, {})
    .use('/registration', RegistrationPage, {})
    .use('/profile', ProfilePage, {})
    .use('/chat', ChatPage, {})
    .use('/404', Error404, {})
    .use('/500', Error500, {})
    .start();
});
