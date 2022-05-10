/* eslint-disable no-shadow */
import EventBus from './EventBus'

type TState = Record<string, any>

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  public state: Indexed = {}

  constructor() {
    super()
    this.state = {}
  }

  public getState() {
    return this.state
  }

  public set(nextState: TState) {
    if (!nextState) {
      return
    }
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
