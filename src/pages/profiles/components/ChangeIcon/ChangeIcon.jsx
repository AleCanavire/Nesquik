import React, { useContext } from 'react';
import { ReactComponent as GoBack } from "../../../../assets/images/go-back.svg";
import RowIcons from './RowIcons';
import { AuthContext } from '../../../../context/AuthContext';

function ChangeIcon({ profile }) {
  const { setShowIcons } = useContext(AuthContext);

  return (
    <div className="change-icon-wrapper">
      <div className="change-icon-header">
        <div className="go-back-wrapper">
          <button className="go-back-button" onClick={()=> setShowIcons(false)}>
            <GoBack/>
          </button>
          <div className="go-back-header">
            <h1 className="header-text">Editar perfil</h1>
            <h2 className="sub-header-text">Elige un ícono para el perfil.</h2>
          </div>
        </div>
        <div className="profile-edit-icon">
          <span className="profile-name">{profile.profile_name}</span>
          <img src={profile.profile_icon} alt={`${profile.profile_name} Icon`} />
        </div>
      </div>
      <div className="change-icon-body">
        <ul className="list-container">
          { icons.map(title => {
            return(
              <li className="slider-row">
                <RowIcons
                  key={title.name}
                  title={title}
                />
              </li>
            )})
          }
        </ul>
      </div>
    </div>
  )
}

export default ChangeIcon;

const icons = [
  {
    name: "Los-clásicos",
    quantity: 21
  },
  {
    name: "Cobra-Kai",
    quantity: 15,
    logo: "/images/icons/Cobra-Kai.png"
  },
  {
    name: "La-Casa-de-Papel",
    quantity: 10,
    logo: "/images/icons/La-Casa-de-Papel.png"
  },
  {
    name: "Stranger-Things",
    quantity: 18,
    logo: "/images/icons/Stranger-Things.png"
  },
  {
    name: "Merlina",
    quantity: 12,
    logo: "/images/icons/Merlina.png"
  },
  {
    name: "El-Juego-del-Calamar",
    quantity: 14,
    logo: "/images/icons/El-Juego-del-Calamar.png"
  },
  {
    name: "The-Witcher",
    quantity: 11,
    logo: "/images/icons/The-Witcher.png"
  },
  {
    name: "Lucifer",
    quantity: 8,
    logo: "/images/icons/Lucifer.png"
  },
  {
    name: "Sex-Education",
    quantity: 16,
    logo: "/images/icons/Sex-Education.png"
  },
  {
    name: "Outer-Banks",
    quantity: 6,
    logo: "/images/icons/Outer-Banks.png"
  },
  {
    name: "On-My-Block",
    quantity: 7,
    logo: "/images/icons/On-My-Block.png"
  },
  {
    name: "Élite",
    quantity: 11,
    logo: "/images/icons/Élite.png"
  },
  {
    name: "Black-Mirror",
    quantity: 7,
    logo: "/images/icons/Black-Mirror.png"
  },
  {
    name: "Nuestro-Planeta",
    quantity: 14,
    logo: "/images/icons/Nuestro-Planeta.png"
  },
  {
    name: "Orange-is-the-new-Black",
    quantity: 10,
    logo: "/images/icons/Orange-is-the-new-Black.png"
  },
  {
    name: "The-Umbrella-Academy",
    quantity: 8,
    logo: "/images/icons/The-Umbrella-Academy.png"
  },
  {
    name: "Lupin",
    quantity: 7,
    logo: "/images/icons/Lupin.png"
  },
  {
    name: "Troll-Hunters",
    quantity: 8,
    logo: "/images/icons/Troll-Hunters.png"
  },
  {
    name: "Big-Mouth",
    quantity: 9,
    logo: "/images/icons/Big-Mouth.png"
  },
  {
    name: "Fuller-House",
    quantity: 8,
    logo: "/images/icons/Fuller-House.png"
  },
  {
    name: "Arcane",
    quantity: 12,
    logo: "/images/icons/Arcane.png"
  },
  {
    name: "Bojack-Horseman",
    quantity: 5,
    logo: "/images/icons/Bojack-Horseman.png"
  },
  {
    name: "Dark",
    quantity: 10,
    logo: "/images/icons/Dark.png"
  },
  {
    name: "The-Crown",
    quantity: 8,
    logo: "/images/icons/The-Crown.png"
  },
  {
    name: "Bright",
    quantity: 4,
    logo: "/images/icons/Bright.png"
  },
  {
    name: "Perdidos-en-el-Espacio",
    quantity: 9,
    logo: "/images/icons/Perdidos-en-el-Espacio.png"
  },
  {
    name: "Desencanto",
    quantity: 6,
    logo: "/images/icons/Desencanto.png"
  },
  {
    name: "Jefe-en-Pañales",
    quantity: 11,
    logo: "/images/icons/Jefe-en-Pañales.png"
  },
  {
    name: "El-Misterio-de-Aaravos",
    quantity: 12,
    logo: "/images/icons/El-Misterio-de-Aaravos.png"
  },
]