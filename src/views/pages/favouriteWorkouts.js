import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class FavouriteWorkoutsView {
  init(){
    document.title = 'Favourite Workouts'    
    this.favWorkouts = null
    this.render()   
    Utils.pageIntroAnim()
    this.getFavWorkouts()
  }

  async getFavWorkouts(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favWorkouts = currentUser.favouriteWorkouts
      console.log(this.favWorkouts)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  render(){
    const template = html`
      <va-app-header title="Radical Fitness" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Favourite Workouts</h1>
        <div class="workout-grid">
        ${this.favWorkouts == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favWorkouts.map(workout => html`
          <va-workout class="workout-card"
          id="${workout._id}"
          name="${workout.name}" 
          image="${workout.image}" 
          description="${workout.description}"
          location="${workout.location}"
          user="${JSON.stringify(workout.user)}"
          type="${workout.type}"
          ></va-workout>
  
          `)}
        `}
        </div>
    </div>
    `
    render(template, App.rootEl)
  }
}


export default new FavouriteWorkoutsView()