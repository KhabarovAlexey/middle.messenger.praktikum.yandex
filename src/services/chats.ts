/* eslint-disable consistent-return */
import chatsApi from '../api/chatsAPI'
import store from '../core/Store'

class ChatsService {
  public async getChats() {
    try {
      store.set({ isLoading: true })
      const chats = await chatsApi.getChatsList()
      store.set({ isLoading: false })
      return chats
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async addNewChat(title: string) {
    try {
      store.set({ isLoading: true })
      const chatId = await chatsApi.addChat({ title })
      store.set({ isLoading: false })
      return chatId
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async addUsersToChat(users: number[], chatId: number) {
    try {
      store.set({ isLoading: true })
      await chatsApi.addUsers({ users, chatId })
      store.set({ isLoading: false })
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async removeUsersFromChat(users: number[], chatId: number) {
    try {
      store.set({ isLoading: true })
      await chatsApi.removeUsers({ users, chatId })
      store.set({ isLoading: false })
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async removeChat(chatId: number) {
    try {
      store.set({ isLoading: true })
      const result = await chatsApi.removeChat({ chatId })
      store.set({ isLoading: false })
      return result
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async getUsers(chatId: number | string) {
    try {
      store.set({ isLoading: true })
      const users = await chatsApi.getUsers(chatId)
      store.set({ isLoading: false })
      return users
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async getToken(chatId: number | string) {
    try {
      store.set({ isLoading: true })
      const token = await chatsApi.getToken(chatId)
      store.set({ isLoading: false })
      return token
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }
}

export default new ChatsService()