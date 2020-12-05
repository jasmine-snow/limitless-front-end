import React, { Component } from 'react'
import './css/Home.css'
import { Image, Feed, Icon } from 'semantic-ui-react'
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
    const src = './img/puzzle.png'

}
// <h3>Status: {this.props.loggedInStatus}</h3>

    render () {
      return (
        <nav className="home-container">
          <div >
            <h1 className="home-name">LimitLess</h1>
            <Image src={'./img/puzzle.png'} size='mini' />
          </div>
        </nav>
      )
    }
  }
