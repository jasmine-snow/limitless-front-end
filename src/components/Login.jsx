import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'
import added_puzzle from './img/added_puzzle.jpg';
import puzzle_login_image from './img/puzzle_login_image.jpg';


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
        credentials: 'include',
        body: JSON.stringify({
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
             <div className="loginContainer">
             <img className="puzzle_login_image" src={puzzle_login_image} alt={`${this.props.username} added_puzzle`} />

               <div className="loginBackground">
               </div>
               {
                this.state.action === "Login"
                &&

                <Form className="loginForm" onSubmit={this.handleLoginSubmit}>
                <h1 className="loginHeader">Login</h1>
                  <Form.Group>
                    <Form.Field>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        placeholder='Enter a email'
                        width={10}
                        value={this.state.email}
                        onChange={this.handleChange} />
                    </Form.Field>
                  </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      placeholder='Enter a password'
                      width={10}
                      value={this.state.password}
                      onChange={this.handleChange} />
                   </Form.Field>
              </Form.Group>
                <Form.Field>
                  <Button compact type='submit'>
                    { this.state.action === "Login"}
                    Submit
                  </Button>
               </Form.Field>
          </Form>
          }
          <div>
            <img className="added_puzzle" src={added_puzzle} alt={`${this.props.username} added_puzzle`} />
          </div>
      </div>
    )
  }
}

export default withRouter(Login);
