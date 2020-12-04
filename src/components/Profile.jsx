import React from "react";

const Profile = props => {

    return (
      <div>
        <div>
          <h1>Profile</h1>
          <h2>Status: {props.loggedInStatus}</h2>
          <h4>every thing that I add to PROFILE will show on all of the pages.
              will use this to diplay profile picture and username when logged in
          </h4>
        </div>
      </div>
    )
  }

export default Profile
