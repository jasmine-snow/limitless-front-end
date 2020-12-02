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
      console.log(`You are trying to ${this.state.action.toLowerCase()} with the following credentials`)
      console.log(this.state);

      if(this.state.action === "Register") {
         this.props.register(this.state)
       } else {
         this.props.login(this.state)
       }
    }
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
             Need an account? Sign up <span className="fake-link" onClick={this.switchForm}>here</span>.
           </p>
           :
           <p>
             Already have an account? Log in <span className="fake-link" onClick={this.switchForm}>here</span>.
           </p>

         }
       </div>
     )
   }
}

export default withRouter(Register);
