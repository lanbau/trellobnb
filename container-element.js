const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      display: flex;
      height:100vh;
    }
    .three-quarters {
      width: 75%;
      background-color: teal;
    }
    .one-quarter {
      width: 25%;
      background-color: lightgrey;
    }
  </style>
  <div class="container">
    <div class="three-quarters">
      3/4
    </div>
    <div class="one-quarter">
      1/4
    </div>
  </div>
`

class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$container = this._shadowRoot.querySelector('.container')
    console.log(this.$container)
  }
}

customElements.define('container-element', Container)
