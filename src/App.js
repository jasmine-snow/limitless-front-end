import React from 'react'
import './App.css';




let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'your heroku bakend url here'
}
console.log('base URL:', baseUrl)


class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        articles: []
      }
    }

    getArticles = () => {
      fetch(baseUrl + './articles').then(res => {
        return res.json()
      }).then(data => {
        this.setState({
          articles: data,
        })
        console.log(this.state.articles)
      })
    }
    render () {
      return (
        <div className='container'>
         <h1>Post</h1>
        </div>
      )
    }
  }

export default App;
