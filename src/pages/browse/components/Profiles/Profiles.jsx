import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

function Profiles() {
  const { user, setActiveProfile } = useContext(AuthContext);

  return (
    <div className="profiles-container">
      <div className="list-profiles-container">
        <div className="list-profiles">
          <h1 className="profile-label">
            ¿Quién está viendo ahora?
          </h1>
          <ul className="choose-profile">
            { user?.profiles?.map(profile => {
                return(
                  <li className="profile" onClick={() => setActiveProfile(profile)} key={profile.index}>
                    <div className="avatar-wrapper">
                      <img src={profile.profile_icon} alt={`${profile.profile_name} Icon`} />
                    </div>
                    <span className="profile-name">{profile.profile_name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <button className="profile-button">
          Administrar perfiles
        </button>
      </div>
    </div>
  )
}

export default Profiles