import Block from 'core/Block'
import Route from 'core/Route'

export default class Router {
  private static __instance: Router

  private _currentRoute: Route | null | undefined

  public history: History = window.history

  protected routes: Route[] = []

  private readonly _rootQuery: string | undefined

  private _pathnames: string[] | undefined

  private _onRouteCallback: (() => void) | undefined

  private _unprotectedPaths: `/${string}`[] | undefined

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery
    this._pathnames = []
    this._onRouteCallback = () => {}
    this._unprotectedPaths = []
    Router.__instance = this
  }

  get currentRoute() {
    return this._currentRoute;
  }

  use(pathname: string, block: typeof Block, props: TStringObject) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
    })

    this.routes.push(route)
    this._pathnames!.push(pathname)
    return this
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames!.includes(pathname)) {
      return '*'
    }
    return pathname
  }

  start() {
    window.onpopstate = (event) => {
      const pathname = this._hasRoute(
        (event.currentTarget as Window).location.pathname,
      )
      this._onRoute(pathname)
    }
    const pathname = this._hasRoute(window.location.pathname)
    this._onRoute(pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()

    if (!this._unprotectedPaths!.includes(pathname as `/${string}`)) {
      this._onRouteCallback!()
    }
  }

  public onRoute(callback: () => void) {
    this._onRouteCallback = callback
    return this
  }

  public setUnprotectedPaths(paths: `/${string}`[]) {
    this._unprotectedPaths = paths
    return this
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}
