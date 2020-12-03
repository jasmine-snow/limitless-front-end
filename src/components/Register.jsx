import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';



class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: false,
      loggedInUserEmail: '',
      loggedIn: false,
      usernameAvailability: true,
      action: 'Login'
    }
  }

    switchForm = () => {
    if(this.state.action === "Login") {
      this.setState({ action: "Register" })
    } else {
      this.setState({ action: "Login" })
    }
  }
    handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

    handleSubmit = (event) => {
      event.preventDefault()
      const url = process.env.REACT_APP_BASEURL + '/users/register'
        if (this.state.password !== this.state.confirmPassword) {
          this.setState({
          passwordError: true
          })
          console.error("Passwords are not a match.")
    } else {
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            credentials: 'include',
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
         }),
         headers: {
           'Content-Type': 'application/json'
         }
         }).then( res => {
           return res.json()
         }).then(user => {
         console.log("The user is:", user)
      })
        if (this.state.action === "Register") {
           this.setState({
             loggedIn: true,
             loggedInUserEmail: this.state.email
           })
           console.error()
         }
       }
    }





// add email already in use function

// username already in use function



    render() {
      if (this.state.redirect)
    return <Redirect to='/' />
   return (
     <div>
       <h2>{this.state.action} here</h2>
       <form onSubmit={this.handleSubmit}>
       {
        this.state.action === "Register"
        &&
        <div>
          <form>
            <label>Name:</label>
              <input type="text"
                name= "name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}>
              </input>
              <label>Username:</label>
                <input type="text"
                  name= "username"
                  placeholder="Enter a username"
                  value={this.state.username}
                  onChange={this.handleChange}>
                </input>
              <label>Phone:</label>
                <input type="text"
                  name= "phone"
                  placeholder="Phone Number"
                  value={this.state.phone}
                  onChange={this.handleChange}>
                </input>
            <label>Confirm Password:</label>
              <input type="password"
                name= "confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}>
              </input>
          </form>
        </div>
       }
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
             { this.state.action === "Login" ? "Log in" : "Sign up"}
           </button>
         </form>
         {
           this.state.action === "Login"
           ?
           <p>
             Need an account? Sign up <span className="fake-link" onClick={this.switchForm}><button>Register</button></span>.
           </p>
           :
           <p>
             Already have an account? Log in <span className="fake-link" onClick={this.switchForm}><button>Login</button></span>.
           </p>

         }
       </div>
     )
   }
}

export default withRouter(Register);
