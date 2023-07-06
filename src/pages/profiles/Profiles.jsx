import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as AddProfile } from "../../assets/images/add-profile.svg";

function Profiles() {
  const { user, setActiveProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  function onSetProfile(profile){
    setActiveProfile(profile);
    navigate("/browse");
  }

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
                  <li className="profile" onClick={() => onSetProfile(profile)} key={profile.id}>
                    <div className="avatar-wrapper">
                      <img src={profile.profile_icon} alt={`${profile.profile_name} Icon`} />
                    </div>
                    <span className="profile-name">{profile.profile_name}</span>
                  </li>
                )
              })
            }
            <li className="profile add-profile">
              <div className="avatar-wrapper">
                <AddProfile/>
              </div>
              <span className="profile-name">Añadir Perfil</span>
            </li>
          </ul>
        </div>
        <Link to="/profiles/manage" className="profile-button">
          Administrar perfiles
        </Link>
      </div>
    </div>
  )
}

export default Profiles