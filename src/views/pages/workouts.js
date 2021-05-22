import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import WorkoutAPI from './../../WorkoutAPI'
import Toast from '../../Toast'

class WorkoutsView {
  async init(){
    document.title = 'Workouts'    
    this.workouts = null
    this.render()    
    Utils.pageIntroAnim()
    await this.getWorkouts()
    this.filterWorkouts()
  }

 async filterWorkouts(field, match){
    //validate
    if(!field || !match) return

// get fresh copy of workouts
this.workouts = await WorkoutAPI.getWorkouts()

    let filteredWorkouts


   //location 
    if(field == 'location'){
      filteredWorkouts = this.workouts.filter(workout => workout.location == match)
    }

    //type of workout
    if(field == 'type'){
      filteredWorkouts = this.workouts.filter(workout => workout.type == match)
       }

     //render
     this.workouts = filteredWorkouts
     this.render()  
      }

  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("type") )
  }    

  handleFilterBtn(e){
    // clear all filter buttons
    this.clearFilterBtns()

    // clear all filter buttons active (type = primary)
    e.target.setAttribute("type", "primary")

    // extract the field and match from the button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")
    
    // filter workouts
    this.filterWorkouts(field, match)
    
  }    

clearFilters(){
  this.getWorkouts()
  this.clearFilterBtns()
}

  async getWorkouts(){
    try{
      this.workouts = await WorkoutAPI.getWorkouts()
      console.log(this.workouts)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
 
  render(){
    const template = html`
      <style>
      .filter-menu {
         display: flex;
         align-items: center;
      }

      .filter-menu > div {
        margin-right: 1em;
      }

      .buttons{
        background-color: yellow;
        padding: 10px;
      }

      .clear{
        background-color: black;
        padding: 1px;
        margin-left: 200px;
      }
      </style>

      <va-app-header title="Radical Fitness" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">       
      <div class="buttons">
      <div class="filter-menu">
      <div> 
      Filer by
      </div>
      <div>
      <strong>Workout type:</strong>      
    
      <sl-button class="filter-btn" size="small" data-field="type" data-match="weight loss" @click=${this.handleFilterBtn.bind(this)}>Weight loss</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="strength training" @click=${this.handleFilterBtn.bind(this)}>Strength training</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="flexability" @click=${this.handleFilterBtn.bind(this)}>Flexability</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="relaxation" @click=${this.handleFilterBtn.bind(this)}>Relaxation</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="rehabilitation" @click=${this.handleFilterBtn.bind(this)}>Rehabilitation</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="post-natal" @click=${this.handleFilterBtn.bind(this)}>Post-natal</sl-button>
      <sl-button class="filter-btn" size="small" data-field="type" data-match="sports performance" @click=${this.handleFilterBtn.bind(this)}>Sports performance</sl-button>
      
      </div>
      <div class="clear">
      <sl-button size="small" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
      </div>

      </div>
       </div> 
      <div class="workout-grid">
      ${this.workouts == null ? html`
      <sl-spinner></sl-spinner>
      ` : html`
      ${this.workouts.map(workout => html`
      
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


export default new WorkoutsView()