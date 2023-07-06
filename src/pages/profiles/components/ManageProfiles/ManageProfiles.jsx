import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import ProfileSettings from '../ProfileSettings/ProfileSettings';

function ManageProfiles() {
  const { user, setProfileSettings, showEditor, setShowEditor} = useContext(AuthContext);

  function onShowSettings(profile) {
    setProfileSettings(profile);
    setShowEditor(true);
  }
  
  return (
    <>
    { showEditor
      ? <ProfileSettings/>
      : <div className="manage-profiles-container">
          <div className="list-profiles-container">
            <div className="list-profiles">
              <h1 className="profile-label">
                Administrar perfiles:
              </h1>
              <ul className="choose-profile">
                { user?.profiles?.map(profile => {
                    return(
                      <li className="profile" onClick={()=> onShowSettings(profile)} key={profile.id}>
                        <div className="avatar-wrapper">
                          <img src={profile.profile_icon} alt={`${profile.profile_name} Icon`}/>
                          <div className="edit-overlay">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-edit ltr-0 e1mhci4z1" data-name="Edit" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path></svg>
                          </div>
                        </div>
                        <span className="profile-name">{profile.profile_name}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <Link to="/profiles" className="profile-button">
              Listo
            </Link>
          </div>
        </div>
    }
    </>
  )
}

export default ManageProfiles