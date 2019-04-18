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

class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$mainContainer = this._shadowRoot.querySelector('.main-container')
    this.$leftContainer = this._shadowRoot.querySelector('.left-container')
    this.$rightContainer = this._shadowRoot.querySelector('.right-container')
  }

  async fetchColumns () {
    const res = await fetch ('http://localhost:3000/columns')
    const json = await res.json()
    return json
  }

  async fetchCards () {
    const res = await fetch ('http://localhost:3000/cards')
    const json = await res.json()
    return json
  }

  async fetchData () {
    const columns = await this.fetchColumns()
    const cards = await this.fetchCards()

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

  async connectedCallback() {
    await this.fetchData()
  }

}

customElements.define('container-element', Container)
