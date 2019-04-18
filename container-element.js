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
  <div class="main-container">
    <div class="left-container"></div>
    <div class="right-container"></div>
  </div>
`

class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$mainContainer = this._shadowRoot.querySelector('.main-container')
    this.$leftContainer = this._shadowRoot.querySelector('.left-container')
    this.$rightContainer = this._shadowRoot.querySelector('.right-container')
  }
}

customElements.define('container-element', Container)
