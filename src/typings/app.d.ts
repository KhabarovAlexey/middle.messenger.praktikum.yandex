declare global {
  export type Nullable<T> = T | null;
  export type TStringObject = {
    [key: string]: string
  }
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

export {};
