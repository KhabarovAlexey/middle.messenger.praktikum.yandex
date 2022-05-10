import Block from 'core/Block'
import renderDOM from 'core/renderDOM'

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export default class Route {
  private _props: TStringObject

  private _block: Block | null

  private _blockClass: typeof Block

  private _pathname: string

  constructor(pathname: string, view: typeof Block, props: TStringObject) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  get pathname() {
    return this._pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.destroy()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    this._block = new this._blockClass(this._props)
    renderDOM(this._props.rootQuery, this._block)
  }
}
