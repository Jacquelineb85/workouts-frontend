import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-workout', class Workout extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
          type: String
      },
      location:{
          type: String
      },
      type: {
          type: String
      },
      user: {
          type: Object
      },
      image: {
          type: String
      }      
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add classname
    dialogEl.className = 'workout-dialog'
    // sl-dialog content
    const dialogContent = html`
    <style>
      .wrap {
      display: flex;
      }
      .image {
      width: 50%;
      }
      .image img {
      width: 100%;
      }
      .content {
      padding-left: 1em;
      }
      .gender span,
      .length span {
      text-transform: uppercase;
      font-weight: bold;
      }
    </style>
    <div class="wrap">
    <div class="image">
      <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
    </div>
  
    <div class="content">
      <h1>${this.name}</h1>
      <p>${this.description}</p>
      <p class="location">${this.location}</p>
      <p class="type">Type: <span>${this.type}</span></p>
     
  
      <sl-button @click=${this.addFavHandler.bind(this)}>
        <sl-icon slot="prefix" name="heart-fill"></sl-icon>
        Add to Favourites
      </sl-button>
      </div>
      </div>
  `

render(dialogContent, dialogEl)

// append to document body
document.body.append(dialogEl)

// show sl-dialog
dialogEl.show()

// on hide delete dialogEl
dialogEl.addEventListener('sl-after-hide', () => {
  dialogEl.remove()
})
  }

  async addFavHandler(){    
    try {
      UserAPI.addFavWorkout(this.id)
      Toast.show('Workout added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  
  render(){    
    return html`
    <style>
    .author{
      font-size: 0.9em;
      font-style: italic:
      opacity: 0.8;
    }
    </style>
    
    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}"/>
        <h2>${this.name}</h2>
        <p class="author">${this.user.firstName} ${this.user.lastName}</p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
        <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>

    `
  }
  
})

