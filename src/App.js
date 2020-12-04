import React from 'react'
import './App.css';
import ArticleForm from './components/ArticlesForm'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';




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
        articles: [],
        currentUser: null

      }
    }

    handleLogOut = (event) => {
      const url = process.env.REACT_APP_BASEURL + '/login/'
      fetch(url, {
        method: 'DELETE',
      }).then(res => {
        if (this.state.action === "logout") {
          this.setState({
            currentUser: null
          })
        }
      })
    }

    getArticles = () => {
      fetch(baseUrl + '/articles').then(res => {
        return res.json()
      }).then(data => {
        this.setState({
          articles: data,
        })
        console.log(this.state.articles)
      })
    }

    addArticles = (newArticle) => {
      const copyArticles = [...this.state.articles];
      copyArticles.push(newArticle);
      this.setState({
        articles: copyArticles,
      });
    }




    addLike = (article) => {
      console.log(article)
      fetch(baseUrl + '/articles/' + article._id, {
        method: 'PUT',
        body: JSON.stringify({ likes: article.likes + 1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(resJson => {
        const copyArticles = [...this.state.articles]
        const findIndex = this.state.articles.findIndex(article => article._id === resJson._id)
        copyArticles[findIndex].likes = resJson.likes
        this.setState({
          articles: copyArticles
        })
      })
    }
    deleteArticle = (id) => {
    console.log(id)
    fetch(baseUrl + '/articles/' + id, {
      method: 'DELETE'
    }).then( response => {
      const findIndex = this.state.articles.findIndex(article => article._id === id)
      const copyArticles = [...this.state.articles]
      copyArticles.splice(findIndex, 1)
      this.setState({
        articles: copyArticles
      })
    })
  }



    componentDidMount(){
    this.getArticles()
  }

    render () {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                <Link to="/Login" >Log In</Link>
                </li>
                <li>
                <Link to="/LogOut" onClick={this.handleLogOut}>Log Out</Link>
                </li>
                <li>
                <Link to="/ArticleForm">Post</Link>
                </li>
              </ul>
            </nav>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/ArticlesForm">
              <ArticleForm />
            </Route>

          </Switch>
          <div className="container">
         <Route path={"/ArticleForm" }>
         <h1>Post</h1>
           <ArticleForm baseUrl={ baseUrl } addArticles={ this.addArticles }/>
             <table>
               <tbody>
                 { this.state.articles.map(article => {
                     return (
                       <tr key={article._id}>
                         <td onDoubleClick={() => this.getArticles(article)}>{ article.title }
                         </td>
                         <td>{article.likes}</td>
                         <td><button onClick={() => this.addLike(article)}>LIKE</button></td>
                         <td><button onClick={() => this.deleteArticle(article._id)}>DELETE</button></td>
                       </tr>
                      )
                    })
                  }
             </tbody>
           </table>
         </Route>
        </div>
      </div>
    </Router>
      )
    }
  }

export default App;
