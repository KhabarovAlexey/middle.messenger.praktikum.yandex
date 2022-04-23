import { isEqual } from 'utils/isEqual';
import renderDOM from 'core/renderDOM';
import Block from 'core/Block';

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: TStringObject;

  constructor(pathname: string, view: typeof Block, props: TStringObject) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._block);
      return;
    }
    this._block.show();
  }
}

export class Router {
  private static __instance: Router;
  protected routes: Route[] = [];
  protected history: History = window.history;
  private _currentRoute: Route | null | undefined;
  private readonly _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props: TStringObject) {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this._currentRoute?.leave();
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route?.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
