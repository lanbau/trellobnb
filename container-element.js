import './column-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .main-container {
      display: flex;
      height:100vh;
    }
    .left-container {
      width: 75%;
      background-color: teal;
      padding: 30px;
    }
    .right-container {
      width: 25%;
      background-color: lightgrey;
    }
  </style>
  <div class="main-container">
    <div class="left-container">
      <button>Add Column</button>
    </div>
    <div class="right-container"></div>
  </div>
`
const columns = [
  {
    "id": 1,
    "title": "Column 1"
  },
  {
    "id": 2,
    "title": "Column 2"
  }
]
class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$mainContainer = this._shadowRoot.querySelector('.main-container')
    this.$leftContainer = this._shadowRoot.querySelector('.left-container')
    this.$rightContainer = this._shadowRoot.querySelector('.right-container')

    columns.forEach(column => {
      let columnElement = document.createElement('column-element')
      columnElement.id = column.id
      columnElement.title = column.title
      this.$leftContainer.appendChild(columnElement)
    })
  }


}

customElements.define('container-element', Container)
