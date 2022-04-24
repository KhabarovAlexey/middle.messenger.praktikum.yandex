import { Block } from 'core';
import ChatPage from 'pages/chat';
import Error404 from 'pages/errors';
import Error500 from 'pages/errors';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import RegistrationPage from 'pages/registration';

export enum Screens {
  Login = 'login',
  Registration = 'registration',
  Profile = 'profile',
  Chat = 'chat',
  Error404 = '404',
  Error505 = '505',
}

const map: Record<Screens, typeof Block> = {
  [Screens.Login]: LoginPage,
  [Screens.Registration]: RegistrationPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chat]: ChatPage,
  [Screens.Error404]: Error404,
  [Screens.Error505]: Error500,
};
export const getScreenComponent = (screen: Screens): typeof Block => {
  return map[screen];
};
