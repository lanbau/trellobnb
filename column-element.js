import './card-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
  .column {
    background-color:white;
    width:300px;
    height:500px;
    margin:30px;
  }
  .column-title {
    text-align:center;
    padding:20px;
  }
  </style>
  <div class="column">
    <div class="column-title"></div>
    <div class="column-body"></div>
  </div>
`

class Column extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$column = this._shadowRoot.querySelector('.column')
    this.$columnTitle = this._shadowRoot.querySelector('.column-title')
    this.$columnBody = this._shadowRoot.querySelector('.column-body')
  }
  set title (value) {
    this.$columnTitle.innerHTML = value
  }
  set id (value) {
    this.$column.id = value
  }

  set card (value) {
    let cardElement = document.createElement('card-element')
    cardElement.description = value.description
    this.$columnBody.appendChild(cardElement)
  }
}

customElements.define('column-element', Column)
