const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card {
      background-color:lightgrey;
      margin:10px;
      padding:30px;
    }
    .card-header {
      display:flex;
      justify-content: space-between;
    }
    .card-actions {
      display:flex;
      margin-bottom:5px;
    }
    .card-description {
      display: none;
    }
  </style>
  <div class="card" draggable="true" id="dragtarget">
    <div class="card-header">
      <div class="card-title"></div>
      <div class="card-actions">
        <button class="card-edit-button">Edit</button>
        <button class="card-delete-button">X</button>
      </div>
    </div>
    <div class="card-description"></div>
    <button class="card-description-button">Read Description</button>
  </div>
`

export default class Card extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$cardTitle = this._shadowRoot.querySelector('.card-title')
    this.$cardDescription = this._shadowRoot.querySelector('.card-description')
    this.$editButton = this._shadowRoot.querySelector('.card-edit-button')
    this.$deleteButton = this._shadowRoot.querySelector('.card-delete-button')
    this.$cardDescriptionButton = this._shadowRoot.querySelector('.card-description-button')

    this.$card = this._shadowRoot.querySelector('#dragtarget')
    this.$card.addEventListener('dragstart', this.onDragStart.bind(this))
    this.$card.addEventListener('dragend',  this.onDragEnd.bind(this))
  }
  onDragStart (event) {
    console.log(event.target.id)
    event.dataTransfer.setData("Text", JSON.stringify({
      id: this.$cardId,
      columnId: this.$columnId,
      description: this.$cardDescription.innerText,
      title: this.$cardTitle.innerText
    }))
  }

  onDragEnd (event) {
    console.log('drag finished')
  }
  set description (value) {
    this.$cardDescription.innerHTML = value
  }

  get description () {
    return this.$cardDescription.innerHTML
  }

  set title (value) {
    this.$cardTitle.innerHTML = value
  }
  set id (value) {
    this.$cardId = value
  }
  set columnId (value) {
    this.$columnId = value
  }

  deleteCardEvent () {
    this.dispatchEvent(new CustomEvent('deleteCard', { detail: this.$cardId }))
  }

  connectedCallback () {
    this.$cardDescriptionButton.addEventListener('click', (e) => {
      this.$cardDescription.style.display = 'block'
    })
    this.$deleteButton.addEventListener('click', (e) => {
      this.deleteCardEvent()
    })
    this.$editButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('editCard', {
        detail: {
          id:this.$cardId,
          title: this.$cardTitle.innerText,
          description: this.$cardDescription.innerText,
          columnId: this.$columnId
        }
      }))
    })
  }
}

customElements.define('card-element', Card)
