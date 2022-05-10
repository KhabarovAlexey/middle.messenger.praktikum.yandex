declare global {
  export type Nullable<T> = T | null
  export type TStringObject = {
    [key: string]: string | undefined
  }
  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]
  export type Indexed<T = any> =
    | {
        [key in string]: T
      }
    | T
  export type User = {
    id: number
    login: string
    firstName: string
  }
  export type AppState = {
    screen: Screens | null
    isLoading: boolean
    loginFormError: string | null
    user: User | null
  }
  export interface Window {
    store: Store<AppState>
    router: HashRouter
  }
}

export {};
