import { Block, registerComponent } from 'core';
import authService from './services/auth';
import { LoginPage } from 'pages/login';
import { RegistrationPage } from 'pages/registration';
import { ProfilePage } from 'pages/profile';
import { ChatPage } from 'pages/chat';
import { Error500, Error404 } from 'pages/errors/errors';
import { router } from './router';
import './app.css';

const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block };
};

Object.values(components).forEach((component) => {
  registerComponent(component.default);
});

document.addEventListener('DOMContentLoaded', () => {
  router
    .setUnprotectedPaths(['/', '/sign-up', '/500'])
    .onRoute(authService.getUser)
    .use('/', LoginPage, {})
    .use('/sign-up', RegistrationPage, {})
    .use('/settings', ProfilePage, {})
    .use('/messenger', ChatPage, {})
    .use('*', Error404, {})
    .use('/500', Error500, {})
    .start();
});
