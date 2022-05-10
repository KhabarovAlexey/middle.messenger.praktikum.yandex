import store from '../core/Store'

type Options = {
  chatId: string | number
  userId: string | number
  token: string
}

class SocketService {
  private _socket!: WebSocket

  private _userId!: string | number

  private _chatId!: string | number

  private _token!: string

  private _ping: any

  constructor() {
    this._open = this._open.bind(this)
    this._message = this._message.bind(this)
    this._error = this._error.bind(this)
    this._close = this._close.bind(this)
  }

  private _open() {
    this.getMessages(0)
    this._ping = setInterval(() => {
      this._socket.send(
        JSON.stringify({
          type: 'ping',
        }),
      )
    }, 10000)
  }

  private _close(event: CloseEventInit) {
    this._removeEvents()

    if (event.wasClean) {
      console.log('Соединение закрыто чисто')
    } else {
      console.log('Обрыв соединения')
    }

    if (event.code === 1006) {
      this.connection({
        userId: this._userId,
        chatId: this._chatId,
        token: this._token,
      })
    }
  }

  private _message(event: MessageEvent) {
    const data = JSON.parse(event.data)
    if (Array.isArray(data)) {
      const newMessages = data.map((msg) => {
        const [currentUser] = store.state.usersOfChat.filter(
          (user: Indexed) => user.id === msg.user_id,
        )
        const message = msg.user_id === store.state.user.id
          ? { ...msg, self: true, name: 'Вы' }
          : {
            ...msg,
            self: false,
            name: `${currentUser.first_name} ${currentUser.second_name}`,
          }

        return message
      })
      const messages = [...store.state.messages, ...newMessages]
      store.set({
        messages,
      })
    }

    if (data.type === 'message') {
      const [currentUser] = store.state.usersOfChat.filter(
        (user: Indexed) => user.id === data.user_id,
      )
      const message = data.user_id === store.state.user.id
        ? { ...data, self: true, name: 'Вы' }
        : {
          ...data,
          self: false,
          name: `${currentUser.first_name} ${currentUser.second_name}`,
        }
      const messages = [message, ...store.state.messages]
      store.set({
        messages,
      })
    }
  }

  private _error(event: ErrorEventInit) {
    console.log('Ошибка', event.message)
  }

  private _addEvents() {
    this._socket.addEventListener('open', this._open)
    this._socket.addEventListener('close', this._close)
    this._socket.addEventListener('message', this._message)
    this._socket.addEventListener('error', this._error)
  }

  private _removeEvents() {
    this._socket.removeEventListener('open', this._open)
    this._socket.removeEventListener('close', this._close)
    this._socket.removeEventListener('message', this._message)
    this._socket.removeEventListener('error', this._error)
  }

  public connection(options: Options) {
    this._chatId = options.chatId
    this._userId = options.userId
    this._token = options.token
    this._socket = new WebSocket(
      `${process.env.SOCKET_ENDPOINT}/${this._userId}/${this._chatId}/${this._token}`,
    )

    this._addEvents()
  }

  public getMessages(offset: number) {
    this._socket.send(
      JSON.stringify({
        content: offset.toString(),
        type: 'get old',
      }),
    )
  }

  public sendMessages(message: string) {
    this._socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    )
  }

  public leave() {
    clearInterval(this._ping)
    this._socket.close()
    this._removeEvents()
  }
}

export default new SocketService()