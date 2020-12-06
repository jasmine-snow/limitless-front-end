import React from 'react'
import './App.css';
import ArticlesForm from './components/ArticlesForm.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import { Card, Image, Feed, Icon } from 'semantic-ui-react'



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
        email: '',
        username: '',
        currentUser: null,
        loggedInStatus: "Not logged in",
        user: {}
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

  loginUser = (username) => {
      this.setState({
        currentUser: username
    });
  };

    render () {
      return (
        <Router>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Thasadith&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
        </style>
          <div>
            <nav>
              <ul className="nav">
                  <li className="navBar">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/ArticleForm">Post</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/Login">Log In</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/LogOut" onClick={this.handleLogOut}>Log Out</Link>
                  </li>
                </ul>
              </nav>
            </div>
          <Switch>
            <Route exact path={"/home"} render={props => (
              <Home {... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
            <Route exactpath={"/Profile"} render={props => (
              <Profile {... props} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path={"/login"} render={props=> (
              <Login {... props} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
            <Route path="/ArticlesForm">
              <ArticlesForm />
            </Route>
          </Switch>
          <div className="container">
         <Route path={"/ArticleForm" }>
         <h1>Post</h1>
           <ArticlesForm baseUrl={ baseUrl } addArticles={ this.addArticles }/>
           </Route>
           <Route path={"/Home"}>
          <div className="cards-Group">
           <Card.Group  itemsPerRow={4} stackable>
                { this.state.articles.map(article => {
                  console.log(article)
                  return (
                   <Card color='teal' key={article._id}>
                    <div className="article-card">
                      <Card.Content>
                        <Card.Header>{'article.user.username'}</Card.Header>
                            <Card.Description>
                            <img className="img_size" src={article.img}  alt={`${this.props.username} name`} />
                              <table className="img-description">
                                <tr key={article._id} className="feed-table">
                                  <th onDoubleClick={() => this.getArticles(article)} className="feed-td">
                                    <h3> { article.title } </h3>
                                  </th>
                                </tr>
                                <tr>
                                  <td className="feed-td">
                                    { article.description }
                                  </td>
                                </tr>
                              </table>
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <span className="like">{ article.likes } <Icon name='like' onClick={() => this.addLike(article)} /> </span>
                              <Icon className="delete-icon" name='delete' onClick={() => this.deleteArticle(article._id)} />
                            </Card.Content>
                          </div>
                      </Card>
                      )
                  })
              }
            </Card.Group>
          </div>
        </Route>
         <Route path={"/Login"}>
            <Login baseUrl={ baseUrl } />
         </Route>
         <Route path={"/Register"}>
            <Register baseUrl={ baseUrl } />
         </Route>
        </div>
    </Router>
      )
    }
  }

export default App;
