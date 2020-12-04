import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';



class LogOut extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id:'',
      name: '',
      email: '',
      password: '',
      loggedOutUserEmail: '',
      loggedOut: false,
      action: 'Logout',
      errors: {}
    }
  }


  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}


    handleLogOut = (event) => {
      const url = process.env.REACT_APP_BASEURL + '/login/'
      fetch(url, {
        method: 'DELETE',
      }).then(res => {
        if (this.state.action === "logout") {
          this.setState({
            currentUser: null

          })
        }
      })
    }


  render() {
    if (this.state.loggedOut)
      return <Redirect to='/app' />
        return (
           <div>
             <h2>{this.state.action} here</h2>
             <button onClick={this.handleLogOut}> Logout </button>
             </div>
           )
         }
       }

  export default withRouter(LogOut);
