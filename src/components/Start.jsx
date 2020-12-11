import React, { Component } from 'react'
import './css/Home.css'
import home_img from './img/home_img.png';


export default class Home extends Component {
  constructor(props) {
    super(props)
}

    render () {
      return (
        <div className="start-container">
          <div className="startLeft">
            <p className="writting-start">Where parents can share resources for Autism</p>
          </div>
          <div className="startRight">
            <div className="addddd">
            <img className="home_img" src={home_img} alt={`home_img`} />

          </div>
            </div>
        </div>
      )
    }
  }
