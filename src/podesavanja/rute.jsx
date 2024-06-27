import {NavLink} from "react-router-dom";
import {
  BarChartOutlined,
  ClusterOutlined,
  ContactsOutlined, DatabaseOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

//ako koristimo top navigaciju - za manje module
export const rute = [
  {id: '/', lokacija: '/', tekst: 'Početna', icon: <HomeOutlined />},
  {id: '/sredstva', lokacija: '/sredstva', tekst: 'O nama', icon: <InfoCircleOutlined />},
  {id: '/contact', lokacija: '/contact', tekst: 'Kontakt', icon: <ContactsOutlined />}
]

//primjer postavke ako koristimo side meni
export const sideMeniPostavka = [
  {
    //key nazivamo isto kao i rutu, da bi bio selektovan po refreshu
    key: '/',
    icon: <NavLink to={'/'}><HomeOutlined /></NavLink>,
    label: 'Početna',
  },
  {
    key: '/sredstva',
    icon: <NavLink to={'/sredstva'}><DatabaseOutlined /></NavLink>,
    label: 'Osnovna sredstva',
  },
  {
    key: '/obracuni',
    icon: <NavLink to={'/obracuni'}><BarChartOutlined /></NavLink>,
    label: 'Obračuni',
  },
  {
    key: 'sub1',
    label: 'Šifrarnici',
    icon: <ClusterOutlined />,
    children: [
      {
        key: '/org-jedinice',
        label: <NavLink to={'/org-jedinice'}>Organizacione jedinice</NavLink>
      },
      {
        key: '6',
        label: 'Konti',
      },
      {
        key: '/por-grupe',
        label: <NavLink to={'/por-grupe'}>Poreske grupe</NavLink>
      },
      {
        key: '8',
        label: 'Jedinice mjere',
      },
    ],
  }
];