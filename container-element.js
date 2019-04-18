const template = document.createElement('template')
template.innerHTML = `
  <style></style>
  <div class="container"></div>
`

class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('container-element', Container)
