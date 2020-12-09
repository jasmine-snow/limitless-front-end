import React from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import Comments from './Comments.jsx';


class Show extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        comments: []
      }
      console.log("these are the props", props)
    }



  render() {
    console.log("this.props", this.props)

    return (
          <div>
            <div className="showContainerLeft">
              <h1>{ this.props.location.title }</h1>
              <p>{ this.props.location.description }</p>
            </div>
            <div className="showContainerRight">
              <p>
                <img className="img_size" src={this.props.location.img}  alt={`img_size`} />
              </p>
            </div>
            <div className="commentsList">
              <h1>List of comments</h1>
                {this.props.comments.map(comment => {
                <Comments comment={comment} />
                console.log("comments:", comment)
                  return (
                    <ul key={comment._id}>
                      <li>{this.props.comments}</li>
                    </ul>
                  )
              })
          }
      </div>
    </div>

        )
     }
  }

export default Show



// <h1>{ props.article.title }</h1>
// <p>{ props.article.description }</p>
// <p>
//   <img className="img_size" src={props.articles.img}  alt={`${this.props.username} img_size`} />
// </p>
