import React from 'react'
import './App.css';
import ArticlesForm from './components/ArticlesForm.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import { Feed, Icon } from 'semantic-ui-react'



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

  loginUser = (user) => {
      this.setState({
        currentUser: user
    });
  };

    render () {
      return (
        <Router>
          <div>
            <nav>
              <ul>
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
                    <Link to="/LogOut" onClick={this.handleLogOut}>Log Out</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="navBar">
                    <Link to="/Login">Log In</Link>
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

             <table>
               <tbody>
                 { this.state.articles.map(article => {
                     return (
                       <Feed>
                        <Feed.Event>
                          <Feed.Label>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                  <Feed.User>{this.username}</Feed.User>
                                  { article.description }
                                </Feed.Summary>
                                <Feed.Meta>
                                  <Feed.Like>
                                    <Icon name='like'onClick={() => this.addLike(article)} />
                                  </Feed.Like>
                                </Feed.Meta>
                              </Feed.Content>

                             <tr key={article._id}>
                               <td onDoubleClick={() => this.getArticles(article)}>{ article.title }
                               </td>
                               <td>{article.likes}</td>
                               <td><button onClick={() => this.deleteArticle(article._id)}>trash alternate outline</button></td>
                             </tr>
                          </Feed.Event>
                       </Feed>
                      )
                    })
                  }
             </tbody>
           </table>


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
