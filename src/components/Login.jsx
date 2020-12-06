import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'



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
             <h2>{this.state.action} here</h2>
             {
              this.state.action === "Login"
              &&
              <Form onSubmit={this.handleLoginSubmit}>
                <Form.Group>
                   <Form.Field>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder='Enter a email'
                        width={8}
                        value={this.state.email}
                        onChange={this.handleChange}
                          />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                     <input
                      type="password"
                      name="password"
                      placeholder='Enter a password'
                      width={8}
                      value={this.state.password}
                      onChange={this.handleChange}
                       />
                 </Form.Field>
              <Button type='submit'>
              { this.state.action === "Login"}
              Submit
              </Button>
            </Form.Group>
        </Form>
        }
      </div>
    )
  }
}

  export default withRouter(Login);
