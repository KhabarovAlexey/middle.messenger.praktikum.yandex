/* eslint-disable consistent-return */
import usersApi from '../api/usersAPI'
import { UserProfile, UserPassword } from '../api/types'
import store from '../core/Store'

class UsersService {
  public async searchUserByLogin(login: string) {
    try {
      const searchResult = await usersApi.searchUserByLogin({ login })
      return searchResult
    } catch (error) {
      console.log(error)
    }
  }

  public async changeUserProfile(data: UserProfile) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserProfile(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async changeUserPassword(data: UserPassword) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserPassword(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async changeUserAvatar(data: FormData) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserAvatar(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async getUserById(id: string) {
    try {
      const responce = await usersApi.getUserById(id)
      return responce
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UsersService()