import React, { Component } from 'react'
import './css/Home.css'


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
        <nav className="home-container">
          <div >
          </div>
        </nav>
      )
    }
  }
