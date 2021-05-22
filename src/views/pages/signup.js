import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
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

              
      .photoright{
        max-width: 100%;
        height: auto;
        float: right;
        margin-right: 60px;
      }
         
      .signup-box{
        margin-top: 200px;
        }
  
      </style>
    

    
    <div class=one>
    <img class="signinup-logo" src="/images/logonew.gif"> 
    </div>

    <img class="photoleft" src="/images/rad1square.jpg">

      <div class="page-content page-centered">      
        <div class="signup-box">
        <h1>Sign Up</h1>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>       
            <div class="input-group">
            <sl-select name="accessLevel" placeholder="I want to..">
            <sl-menu-item value="1">Get fit!</sl-menu-item>
            <sl-menu-item value="2">Train people!</sl-menu-item>
            </sl-select>
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
          </sl-form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
              </div>
     
    
         `
    render(template, App.rootEl)
  }
}


export default new SignUpView()