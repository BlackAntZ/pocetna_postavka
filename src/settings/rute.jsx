import {NavLink} from "react-router-dom";
import {ContactsOutlined, HomeOutlined, InfoCircleOutlined} from "@ant-design/icons";

//ako koristimo top navigaciju - za manje module
export const rute = [
  {id: '/', lokacija: '/', tekst: 'Početna', icon: <HomeOutlined/>},
  {id: '/about', lokacija: '/about', tekst: 'O nama', icon: <InfoCircleOutlined/>},
  {id: '/contact', lokacija: '/contact', tekst: 'Kontakt', icon: <ContactsOutlined/>}
]

//primjer postavke ako koristimo side meni
export const sideMeniPostavka =
  [
    {
      //key nazivamo isto kao i rutu, da bi bio selektovan po refreshu
      key: '/',
      icon: <NavLink to={'/'}><HomeOutlined/></NavLink>,
      label: 'Početna',
    },
  ];;