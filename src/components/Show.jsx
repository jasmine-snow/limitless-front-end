import React from 'react';
import { withRouter, Redirect} from 'react-router-dom';


class Show extends React.Component {
  constructor(props) {
    super(props)
    console.log("these are the props", props)
  }


// function Show(props) {
//   console.log("these are the props", props)
  render() {
    console.log("this.props", this.props)

    return (
          <div>
            <h1>show page</h1>

            <h1>{ this.props.location.title }</h1>
            <p>{ this.props.location.description }</p>
            <p>
              <img className="img_size" src={this.props.location.img}  alt={`img_size`} />
            </p>

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
