import React from 'react'
import './App.css';
import ArticlesForm from './components/ArticlesForm.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Start from './components/Start.jsx'
import Show from './components/Show.jsx'
import { Card, Icon } from 'semantic-ui-react'
import puzzle_moms from './components/img/puzzle_moms.jpg';


import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = process.env.REACT_APP_BASEURL;
} else {
  baseUrl = 'https://limitless-backend.herokuapp.com';
}
console.log('base URL:', baseUrl)


class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        articles: [],
        email: '',
        currentUser: ''
      }
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


    componentDidMount(){
    this.getArticles()
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


    render () {
      return (
        <Router>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Thasadith&display=swap');
            </style>
            <div>
              <div className="beforeNav">
                <img className="mainImage" src={puzzle_moms} alt={`${this.props.username} mainImage`} />
                <p className="mainLabel">LimitLess</p>
                <hr/>
              </div>
              <nav>
                <ul className="nav">
                    <Link className="navBar" to="/ArticleForm"></Link>
                    <Link className="navBar" to="/Start">Home</Link>
                    <Link className="navBar" to="/home">Feed</Link>
                    <Link className="navBar" to="/register">Register</Link>
                    <Link className="navBar" to="/Login">Log In</Link>
                    <Link className="navBar" to="/login" onClick={this.handleLogOut}>Log Out</Link>
                  </ul>
                </nav>
              </div>
          <Switch>
              <Route exact path={"/"} render={props => (
                <Home {... props} />
              )}/>
              <Route exact path={"/register"} render={props=> (
                <Register {... props} />
              )}/>
              <Route exact path={"/login"} render={props=> (
                <Login {... props} />
              )}/>
              <Route exact path={"/ArticlesForm"} render={props=> (
                <ArticlesForm {... props} />
              )}/>
              <Route exact path={"/Show"} render={props=> (
                <Show {... props} />
              )}/>
              <Route exact path={"/Start"} render={props=> (
                <Start {... props} />
              )}/>
          </Switch>
          <div className="container">
            <Route path={"/ArticleForm" }>
              <ArticlesForm baseUrl={ baseUrl } addArticles={ this.addArticles }/>
            </Route>
            <Route path={"/Home"}>
              <div className="cards-Group">
                <Card.Group  itemsPerRow={4} stackable>
                  { this.state.articles.map(article => {
                    console.log(article)
                    return (

                      <Card color='blue' key={article._id}>

                        <div className="article-card">
                          <Card.Content>
                            <Card.Description>
                              <img className="img_size" src={article.img}  alt={`${this.props.username} img_size`} />
                              <table className="img-description">
                                <thead key={article._id} className="feed-table">
                                  <th onDoubleClick={() => this.getArticles(article)} className="feed-td">
                                    <Link to={{
                                        pathname: "/Show",
                                        title: article.title,
                                        description: article.description,
                                        img: article.img
                                        }}>
                                        <p>{article.title}</p>
                                    </Link>
                                  </th>
                                </thead>
                                <tbody>
                                  <td className="feed-td">
                                    { article.description }
                                  </td>
                                </tbody>
                              </table>
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <span className="like">{ article.likes }
                              <Icon name='like'
                              onClick={() => this.addLike(article)} />
                            </span>
                              <Icon
                                className="delete-icon"
                                name='delete'
                                onClick={() => this.deleteArticle(article._id)} />
                        </Card.Content>
                      </div>
                    </Card>
                    )
                  })
                }
              </Card.Group>
            </div>
          </Route>
        </div>
      </Router>
      )
    }
  }

export default App;
