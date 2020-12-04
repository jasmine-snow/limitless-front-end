import React, { Component } from 'react'
import './css/Home.css'
import { Feed, Icon } from 'semantic-ui-react'
export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      loggedInUserEmail: '',
      name: '',
      username: '',
      feed: '',
      title: '',
      img: '',
      comments: '',
      description: '',
      likes: ''
    }
}

render () {
  return (
    <div>
      <h1>Home</h1>
      <h3>Status: {this.props.loggedInStatus}</h3>
      <h6>all post feed will be redirected here</h6>
    </div>
  )
}

}
