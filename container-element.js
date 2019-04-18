import './column-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .main-container {
      display: flex;
      background-color: teal;
    }
    .left-container {
      width: 75%;
      background-color: teal;
      padding: 30px;
      display:flex;
      flex-wrap: wrap;
    }
    .right-container {
      width: 25%;
      background-color: lightgrey;
    }
  </style>
  <div class="main-container">
    <div class="left-container"></div>
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

const cards = [
  {
    "id": 1,
    "title": "Card 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "columnId": 1
  },
  {
    "id": 2,
    "title": "Card 2",
    "description": "Quisque et pellentesque sem.",
    "columnId": 1
  },
  {
    "id": 3,
    "title": "Card 3",
    "description": "Nulla porttitor erat a sollicitudin volutpat.",
    "columnId": 1
  },
  {
    "id": 4,
    "title": "Card 4",
    "description": "Quisque id scelerisque felis, sit amet scelerisque nunc.",
    "columnId": 2
  },
  {
    "id": 5,
    "title": "Card 5",
    "description": "Suspendisse posuere ipsum at dui lacinia, ut faucibus lectus mollis.",
    "columnId": 2
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

      cards.forEach(card => {
        if (card.columnId == column.id) {
          columnElement.card = card
        }
      })

      this.$leftContainer.appendChild(columnElement)
    })
  }


}

customElements.define('container-element', Container)
