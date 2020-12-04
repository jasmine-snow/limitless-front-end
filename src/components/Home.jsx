import React, { Component } from 'react'
import Register from './Register'


export default class Home extends Component {
  constructor() {
    super()

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

  componentDidMount(){
  this.getArticles()
}

  render () {
    return (
      <div>
      <ul>
      <li>

      </li>
      </ul>
      </div>
    )
  }
}
