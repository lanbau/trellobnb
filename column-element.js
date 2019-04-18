const template = document.createElement('template')
template.innerHTML = `
  <style></style>
  <div class="column"></div>
`

class Column extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('column-element', Column)
