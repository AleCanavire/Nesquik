import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import ChangeIcon from '../ChangeIcon/ChangeIcon';

function ProfileSettings() {
  const { user, setUser, profileSettings, setProfileSettings, setShowEditor, showIcons, setShowIcons } = useContext(AuthContext);
  const [inputLength, setInputLength] = useState(0);
  const [name, setName] = useState(profileSettings?.profile_name);

  function handleSave(){
    const indexProfile = user.profiles.findIndex(profile => profile.id === profileSettings.id);

    const profile = { 
      ...profileSettings,
      profile_name: name
    };

    setUser(prev => {
      const profilesCopy = [...prev.profiles];
      profilesCopy.splice(indexProfile, 1, profile);
      return {
        ...prev,
        profiles: profilesCopy
      }
    })

    setProfileSettings(null);
    setShowEditor(false);
  }
  
  function handleCancel(){
    setProfileSettings(null);
    setShowEditor(false);
  }

  return (
    <>
    { showIcons
      ? <ChangeIcon
          profile={profileSettings}
        />
      : <div className="profile-actions-container">
          <div className="profiles-actions">
            <h1>Editar perfil</h1>
            <div className="profile-metadata">
              <div className="main-profile-avatar">
                <div className="avatar-box">
                  <img src={profileSettings.profile_icon}/>
                  <button className="avatar-edit-icon" aria-label="Cambiar imagen del perfil" onClick={()=> setShowIcons(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-edit ltr-0 e1mhci4z1" data-name="Edit" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path></svg>
                  </button>
                </div>
              </div>
              <div className="profile-edit-parent">
                <div className="profile-edit-input">
                  <input
                    type="text"
                    placeholder="Nombre"
                    defaultValue={profileSettings.profile_name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="profile-dropdown-wrapper">
                  <div className="profile-dropdown">
                    <h2 className="profile-language">Idioma:</h2>
                    <div className="dropdown">
                      <div className="label">
                        Español
                        <span className="arrow"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="games-wrapper">
                  <label htmlFor="gamesHandleInput">
                    <h2>Alias de juegos:</h2>
                  </label>
                  <p className="games-description">
                    Tu alias es un nombre único que se usará para jugar con otros miembros de Netflix en Juegos Netflix.
                    <span> Más info</span>
                  </p>
                  <input
                    onChange={(e)=> setInputLength(e.target.value.length)}
                    id="gamesHandleInput"
                    type="text"
                    placeholder="Crear alias de juegos"
                  />
                  <div className="input-info">
                    <p className="length">{`${inputLength}/16`}</p>
                  </div>
                </div>
                <div className="profile-restrictions-wrapper">
                  <h2 className="profile-restrictions-header">Configuración por edad:</h2>
                  <div className="profile-restrictions-body">
                    <ul>
                      <li>Todas las clasificaciones por edad</li>
                    </ul>
                    <p>Mostrar títulos de <b>todas las clasificaciones</b> en este perfil.</p>
                  </div>
                  <div className="profile-restrictions-edit">
                    <button className="restrictions-edit-button">
                      Editar
                    </button>
                  </div>
                </div>
                <div className="profile-autoplay-wrapper">
                  <h2 className="profile-autoplay-header">Controles de reproducción automática</h2>
                  <label className="autoplay-option" htmlFor="nextEpisode-profile">
                    <input type="checkbox" id="nextEpisode-profile"/>
                    <span className="checkbox">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-check-mark ltr-0 e1mhci4z1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z" fill="currentColor"></path></svg>
                    </span>
                    <span>
                      Reproducir automáticamente el siguiente episodio de una serie en todos los dispositivos.
                    </span>
                  </label>
                  <label className="autoplay-option" htmlFor="videomerch-profile">
                    <input type="checkbox" id="videomerch-profile"/>
                    <span className="checkbox">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-check-mark ltr-0 e1mhci4z1" data-name="Checkmark" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z" fill="currentColor"></path></svg>
                    </span>
                    <span>
                      Se reproducen automáticamente los avances mientras navegas (en todos los dispositivos).
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button className="profile-button profile-save-button" onClick={handleSave}>
              Guardar
            </button>
            <button className="profile-button profile-cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
    }
    </>
  )
}

export default ProfileSettings