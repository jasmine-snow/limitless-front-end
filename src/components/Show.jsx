import React from 'react';


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
          </div>

        )
     }
  }

export default Show
