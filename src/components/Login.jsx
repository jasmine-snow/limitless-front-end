import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';



class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username:'',
      email: '',
      password: '',
      loggedInUserEmail: '',
      loggedIn: false,
      action: 'Login',
      errors: {}

    }
  }

    handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

    handleLoginSubmit = (event) => {
      event.preventDefault()
      const url = process.env.REACT_APP_BASEURL + '/login'
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          credentials: 'include',
          email: this.state.email,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
        }).then(res => {
          if (this.state.email === this.state.loggedIn) {
          this.props.handleSuccessfulLogin(res.data)
        }
          return res.json()
        }).then(user => {
          console.log("logging in:", user)
            if (this.state.action === "Login") {
              this.setState({
                loggedIn: true,
                loggedInUserEmail: this.state.email
              })
            console.error()
          }
        })
    }


  render() {
    if (this.state.loggedIn)
      return <Redirect to='/home' />
        return (
           <div>
             <h2>{this.state.action} here</h2>
             <form onSubmit={this.handleLoginSubmit}>
             {
              this.state.action === "Login"
              &&
                <div>
                  <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter a email"
                      value={this.state.email}
                      onChange={this.handleChange}>
                    </input>
                 <label>Password:</label>
                   <input
                     type="password"
                     name="password"
                     placeholder="Enter a password"
                     value={this.state.password}
                     onChange={this.handleChange}>
                   </input>
               <button type="Submit">
                 { this.state.action === "Login"}
                 Login
               </button>
            </div>
            }
        </form>
      </div>
    )
}
}

  export default withRouter(Login);
