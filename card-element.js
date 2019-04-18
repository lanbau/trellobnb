const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card {
      background-color:lightgrey;
      margin:10px;
      padding:30px;
    }
  </style>
  <div class="card">
    <div class="card-description"></div>
  </div>
`

class Card extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$cardDescription = this._shadowRoot.querySelector('.card-description')
  }
  set description (value) {
    this.$cardDescription.innerHTML = value
  }
}

customElements.define('card-element', Card)
