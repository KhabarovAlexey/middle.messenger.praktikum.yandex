import Block from 'core/Block'
import './loader.css'

interface LoaderProps {
  show: boolean
}

export class Loader extends Block {
  static nameOfComponent = 'Loader'

  constructor(props: LoaderProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="lds-facebook {{#if show}}lds-facebook_show{{/if}}"><div></div><div></div><div></div></div>
    `
  }
}