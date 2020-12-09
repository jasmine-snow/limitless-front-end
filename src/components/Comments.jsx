import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'



export default class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
    }
  }


  handleSubmit (event) {
    event.preventDefault()
    fetch(this.props.baseUrl + '/articles', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
        comments: this.state.comments
       }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( res => {
      return res.json();
    }).then( data => {
      this.props.addArticlesComments(data)
      this.setState({
        comments: '',
      })
    }).catch (error => console.error({'Error': error}))
  }

  handleSubmitChange (event) {
    console.log(event.target.value)
    this.setState({
      comments: event.target.value
    })
  }



    render() {
      return (
        <Form
          onSubmit={ (e) => this.handleSubmit(e)}>
          <textarea name="content"
          onChange={ (e) => this.handleSubmitChange(e) }
          value={ this.state.title }
          placeholder="Comment">
          </textarea>
          <div class="text-right">
            <Button type="submit">Submit</Button>
          </div>
       </Form>

     )
    }
  }



    //
    // getArticlesComments = () => {
    //   event.preventDefault()
    //   fetch(baseUrl + '/articles/' ).then(res => {
    //     return res.json()
    //   }).then(data => {
    //     this.setState({
    //       comments: data,
    //     })
    //     console.log(this.state.comments)
    //   })
    // }
    //
    //
    // addArticlesComments = (newComments) => {
    //   const copyArticlesComments = [...this.state.comments];
    //   copyArticlesComments.push(newComments);
    //   this.setState({
    //     comments: newComments,
    //   });
    // }
