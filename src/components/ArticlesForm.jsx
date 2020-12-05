import React, { Component } from 'react'

export default class ArticlesForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      img: '',
      description: '',
    }
  }
  

  handleSubmit (event) {
    event.preventDefault()
    fetch(this.props.baseUrl + '/articles', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        img: this.state.img,
        description: this.state.description
       }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( res => {
      return res.json();
    }).then( data => {
      this.props.addArticles(data)
      this.setState({
        title: '',
        img: '',
        description: ''
      })
    }).catch (error => console.error({'Error': error}))
  }
  handleTitleChange (event) {
    console.log(event.target.value)
    this.setState({
      title: event.target.value
    })
  }
  handleImgChange (event) {
    console.log(event.target.value)
    this.setState({
      img: event.target.value
    })
  }
  handleDescriptionChange (event) {
    console.log(event.target.value)
    this.setState({
      description: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={ (e) => this.handleSubmit(e)}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" onChange={ (e) => this.handleTitleChange(e) } value={ this.state.title } />
            <label htmlFor="img">Image: </label>
            <input type="text" id="img" onChange={ (e) => this.handleImgChange(e) } value={ this.state.img }/>
            <label htmlFor="description">Description: </label>
            <input type="description" id="discription" onChange={ (e) => this.handleDescriptionChange(e) } value={ this.state.description }/>
            <input type="submit" value="Add a post" />
          </form>
        </div>
      </div>
    )
  }
}
