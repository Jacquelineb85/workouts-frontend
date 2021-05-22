import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
    <style>
      body {
        background-color: yellow;
      }

    .signinup-logo{
      width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
      }
          
      .photoleft{
        max-width: 100%;
        height: auto;
        margin-left: 60px;
      }

      @media (max-width:1299px){
        .photoright{
          max-width: 100%;
          height: auto;  
          margin-left: 60px;
          margin-top: 50px;
        }
      }

      @media (min-width:1300px){
      .photoright{
        max-width: 100%;
        height: auto;
        float: right;
        margin-right: 60px;
      }
    }

      @media (min-width:1300px){    
      .rebelpic{
        margin-left: 110px;
      }
    }

    @media (max-width:600px){    
      .rebelpic{
        margin-left: 60px;
        margin-top: 500px;
              }
    }

   </style>

       <div class=one>
    <img class="signinup-logo" src="/images/logonew.gif"> 
    </div>

    <img class="photoleft" src="/images/rad1square.jpg">

      <div class="page-content page-centered">
        <div class="signinup-box">
              
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <sl-button class="submit-btn"; type="primary"; submit style="width: 100%;">Sign In</sl-button>
          </sl-form>
          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
        </div>
          </div>

      <img class="rebelpic" src="/images/rebel.gif">

      <img class="photoright" src="/images/rad2square.jpg">
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()