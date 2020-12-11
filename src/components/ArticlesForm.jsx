import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import moms_dads_puzzles from './img/moms_dads_puzzles.jpg';



export default class ArticlesForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: '',
      username: '',
      title: '',
      img: '',
      description: '',
    }
  }


  handleSubmit (event) {
    event.preventDefault()
    const object = {
      username: this.state.username,
      title: this.state.title,
      img: this.state.img,
      description: this.state.description
     }
     console.log("uri:", this.props.baseUrl)
     console.log("this is the object:", object)
    fetch(this.props.baseUrl + '/articles', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
        username: this.state.username,
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
        username: '',
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
            <div className="post_background">
            </div>
            <div>
              <img className="added_puzzle_two" src={moms_dads_puzzles} alt={` added_puzzle_two`} />
            </div>
            <div className="addedText">
              <h2>Post an Article or a thought!</h2>

            </div>
            <Form className="ArticleForm" onSubmit={ (e) => this.handleSubmit(e)}>
                <Form.Field>
                  <label htmlFor="title">Title: </label>
                  <input type="text" id="title" onChange={ (e) => this.handleTitleChange(e) } value={ this.state.title } />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="img">URL: </label>
                  <input type="text" id="img" onChange={ (e) => this.handleImgChange(e) } value={ this.state.img }/>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Description: </label>
                  <input type="text" id="discription" onChange={ (e) => this.handleDescriptionChange(e) } value={ this.state.description }/>
                </Form.Field>
                <Form.Field>
                  <Button type="submit" >
                    Submit
                  </Button>
               </Form.Field>
            </Form>
        </div>
      </div>
    )
  }
}
