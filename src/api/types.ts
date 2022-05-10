export type SearchUserData = {
  login: string
}

export type UserPassword = {
  oldPassword: string
  newPassword: string
}

export type UserProfile = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export type AddChatData = {
  title: string
}

export type UsersData = {
  users: number[]
  chatId: number
}

export type RemoveChatData = {
  chatId: number | string
}

export type LoginData = {
  login: string
  password: string
}

export type SignupData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}