import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`

    <style>
  
   @media (min-width: 601px){ 
    .photo{
      margin-top: 200px;
      display: inline-block;
      background-color: yellow;
      width: 600px;
      padding: 40px;
      margin-left: 120px;
    }
  }
    
    @media (max-width: 600px){
      .photo{
      display: inline-block;
      background-color: yellow;
      width: 300px;
      padding: 40px;
      margin-top: 200px;
      margin-left: 20px;
    }
  }

    .text{
      float: right;
      max-width: 300px;

      
    

    </style>
      <va-app-header title="Radical Fitness" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
     
      <div class"page-content" "page-centered">
       
       <div class="photo">               
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          
        <sl-avatar shape="square"; style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
    
       <div class="text">
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <h3>${Auth.currentUser.location}</h3>
       
        <p>${Auth.currentUser.email}</p>

        ${Auth.currentUser.bio ? html`
        <h3>About:</h3>
       <p>${Auth.currentUser.bio}</p>

       ` : html``}
      
       
        
        <sl-button class="anim-in" @click=${() => gotoRoute('/editProfile')}>Edit Profile</sl-button>
       </div>
        

          </div>        
         
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()