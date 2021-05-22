import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import WorkoutAPI from './../../WorkoutAPI'
import Toast from '../../Toast'

class newWorkoutView {
  init(){
    document.title = 'New Workout'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newWorkoutSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    const formData = e.detail.formData


    try{
      await WorkoutAPI.newWorkout(formData)
    Toast.show('Workout added!')
    submitBtn.removeAttribute('loading')
    // reset form
    // reset text textarea inputs
    const textInputs = document.querySelectorAll('sl-input, sl-textarea')
    if(textInputs) textInputs.forEach(textInput => textInput.value = null)
    // reset menus
    const menuInputs = document.querySelectorAll('sl-menu-item')
    if(menuInputs) menuInputs.forEach(menuInput => menuInput.value = null)
    // reset file input
    const fileInput = document.querySelector('input[type=file]')
    if(fileInput) fileInput.value = null


    }catch(err){
        Toast.show(err, 'error')
        submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`

      <va-app-header title="Radical Fitness" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
      
        <h1>New Workout</h1>
        <sl-form class="page-form" @sl-submit=${this.newWorkoutSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Workout Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="location" type="text" placeholder="Location" required>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          
          <div class="input-group">
          <sl-select name="type" placeholder="Workout type">
          <sl-menu-item value="weight loss">Weight loss</sl-menu-item>
          <sl-menu-item value="strength">Strength training</sl-menu-item>
          <sl-menu-item value="flexability">Flexability</sl-menu-item>
          <sl-menu-item value="relaxation">Relaxation</sl-menu-item>
          <sl-menu-item value="rehabilitation">Rehabilitation</sl-menu-item>
          <sl-menu-item value="post natal">Post-natal</sl-menu-item>
          <sl-menu-item value="sports performance">Sports Performance</sl-menu-item>

          </sl-select>
          
          <div class="input-group" style="margin-bottom: 2em;">
          <label>Image</label><br>
          <input type="file" name="image" />              
          </div>
         

          <sl-button type="primary" class="submit-btn" submit>Add Workout</sl-button>     
              
        
          </sl-form>      
                   
      
      </div>      
                `


      render(template, App.rootEl)
  }
}


export default new newWorkoutView()