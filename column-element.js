const template = document.createElement('template')
template.innerHTML = `
  <style>
  .column {
    background-color:white;
    width:300px;
    height:500px;
  }
  </style>
  <div class="column"></div>
`

class Column extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$column = this._shadowRoot.querySelector('.column')
  }
  set title (value) {
    this.$column.innerHTML = value
  }
  set id (value) {
    this.$column.id = value
  }
}

customElements.define('column-element', Column)
