import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'
import collab_puzzle from './img/collab_puzzle.png';



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
      registeredUserEmail: '',
      registered: false,
      loggedIn: false,

      usernameAvailability: true,
      action: 'Register'
    }
  }

    switchForm = () => {
    if(this.state.action === "Register") {
      this.setState({ action: "Register" })
    }
  }
    handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

    handleRegisterSubmit = (event) => {
      event.preventDefault()
      const usersURL = process.env.REACT_APP_BASEURL + '/users/register'
        if (this.state.password !== this.state.confirmPassword) {
          this.setState({
          passwordError: true
          })
          console.error("Passwords are not a match.")
    } else {
        fetch(usersURL, {
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
         console.log("Registered:", user)
        })
        if (this.state.action === "Register") {
           this.setState({
             registered: true,
             registeredUserEmail: this.state.email
           })
           console.error()
        }
      }
    }

    render() {
      if (this.state.registered)
        return <Redirect to='/home' />
          return (
             <div>
             <div className="registerBackground">
             </div>
             <div>
               <img className="collab_puzzle" src={collab_puzzle} alt={`${this.props.username} collab_puzzle`} />
             </div>
               <Form className="registerForm" onSubmit={this.handleRegisterSubmit}>
               <h1 className="registerHeader">Register</h1>

               {
                this.state.action === "Register"
                &&
                <div>
                  <Form.Field>
                    <label>Name:</label>
                    <input type="text"
                        name= "name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}>
                    </input>
                  </Form.Field>
                   <Form.Field>
                    <label>Username:</label>
                    <input
                        type="text"
                        name= "username"
                        placeholder="Enter a username"
                        value={this.state.username}
                        onChange={this.handleChange}>
                    </input>
                  </Form.Field>
                  <Form.Field>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter a email"
                        value={this.state.email}
                        onChange={this.handleChange}>
                    </input>
                  </Form.Field>
                  <Form.Field>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name= "phone"
                        placeholder="Phone Number"
                        value={this.state.phone}
                        onChange={this.handleChange}>
                    </input>
                </Form.Field>
                <Form.Field>
                   <label>Confirm Password:</label>
                   <input
                      type="password"
                      name= "confirmPassword"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}>
                  </input>
              </Form.Field>
              <Form.Field>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={this.state.password}
                    onChange={this.handleChange}>
                </input>
            </Form.Field>
            <Form.Field>
                <Button type="Submit">
                { this.state.action === "Register"}
                Register
                </Button>
              </Form.Field>
        </div>
         }
      </Form>
    </div>
    )
  }
}

export default withRouter(Register);
