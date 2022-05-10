import auth from 'api/authAPI';
import { LoginData, SignupData } from 'api/types';
import store from 'core/Store';
import { isValid } from 'utils/validate';
import { router } from '../router';

class AuthService {
  public async login(data: LoginData) {
    try {
      store.set({ isLoading: true });
      if (!isValid(data)) {
        throw new Error('Data is not valid');
      }

      if (store.getState().user) {
        store.set({ isLoading: false });
        router.go('/messenger');
      }
      console.log('login');

      await auth.login(data);

      const user = await auth.getUser();
      store.set({ isLoading: false, user });
      router.go('/messenger');
    } catch (error: Indexed) {
      store.set({ isLoading: false });
      if (error.reason === 'User already in system') {
        router.go('/messenger');
        return;
      }
      store.set({ error: error.reason });
      store.set({ error: '' });
    }
  }

  public async signup(data: SignupData) {
    if (!isValid(data)) {
      throw new Error('Data is not valid');
    }

    try {
      store.set({ isLoading: true });
      await auth.signUp(data);

      router.go('/messenger');
      store.set({ isLoading: false });
    } catch (error: Indexed) {
      store.set({ isLoading: false });
      if (error.reason === 'User already in system') {
        router.go('/messenger');
        return;
      }
      store.set({ error: error.reason });
      store.set({ error: '' });
    }
  }

  public async logout() {
    try {
      store.set({ isLoading: true });
      await auth.logout();
      store.set({ isLoading: false, user: null });
      router.go('/');
    } catch (error) {
      console.log(error);
    }
  }

  public async getUser() {
    try {
      store.set({ isLoading: true });
      const user = await auth.getUser();
      store.set({ isLoading: false, user });
      return user;
    } catch (error) {
      store.set({
        isLoading: false,
      });
      router.go('/');
    }
  }
}

export default new AuthService();
