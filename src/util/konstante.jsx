import {NavLink} from "react-router-dom";
import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined
} from "@ant-design/icons";

//test || production
// export const okruzenje = 'production';
// export const testniUrl = '...';
// export const productionUrl = '...';

export const modul = 'Testna postavka';

//side || top
export const navigation = 'side';

export const odabirKlinike = false;
export const odabirOdjela = false;

//lokacija na koju se vracamo kad izlazimo iz aplikacije
export const pocetnaStranicaUrl = '...';

//ako koristimo top navigaciju - za manje module
export const rute = [
  {lokacija: '/', tekst: 'Početna', icon: <HomeOutlined />},
  {lokacija: '/about', tekst: 'O nama', icon: <InfoCircleOutlined />},
  {lokacija: '/contact', tekst: 'Kontakt', icon: <ContactsOutlined />}
]

//primjer postavke ako koristimo side menu
export const sideMeniPostavka = [
  {
    //key nazivamo isto kao i rutu, da bi bio selektovan po refreshu
    key: '/',
    icon: <NavLink to={'/'}><HomeOutlined /></NavLink>,
    label: 'Početna',
  },
  {
    key: '/about',
    icon: <NavLink to={'/about'}><InfoCircleOutlined /></NavLink>,
    label: 'O nama',
  },
  {
    key: '/contact',
    icon: <NavLink to={'/about'}><ContactsOutlined /></NavLink>,
    label: 'Kontakt',
  },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: '7',
        label: 'Option 7',
      },
      {
        key: '8',
        label: 'Option 8',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
          },
        ],
      },
    ],
  },
];

//antd stilovi, postojeće ne treba mijenjati, opcionalno dodati nove
export const tema = {
  token: {
    colorBgElevated: 'var(--header-background)',
    colorSplit: 'var(--top-nav-marker)'
  },
  components: {
    Menu: {
      itemColor: 'var(--header-text)',
      itemHoverColor: 'var(--header-text)',
      itemActiveColor: 'var(--header-text)',
      itemHoverBg: 'var(--button-hover-highlight)',
      itemActiveBg: 'transparent',
      itemSelectedBg: 'var(--header-text)',
      itemSelectedColor: 'var(--header-background)',
    }
  }
}

export const sesijaTestna = {
  cfid: "69050",
  cftoken: "E3C30397-3764-4DD2-A65264D21C7A3F6B",
  urltoken: "CFID=69050&CFTOKEN=E3C30397-3764-4DD2-A65264D21C7A3F6B",
  sessionid: "KISS_69050_E3C30397-3764-4DD2-A65264D21C7A3F6B",
  loggedin: "True",
  cookieset: "0",
  ipaddr: "",
  jezik: "srpski",
  baza_podataka: "kiss",
  tip_baze_podataka: "mysql",
  avar_baza_podataka_conf: "kiss",
  id_klijenta: 1,
  naziv_klijenta: "Univerzitetski klinički centar Republike Srpske",
  drzava_klijenta: "RS",
  id_korisnika: 4308,
  ime_korisnika: "Bajić Dejan",
  potpis_korisnika: "Dejan Bajić",
  grupa_korisnika: "2,12,11,21,9,18,3,0,20,22,1",
  funkcija_korisnika: "18,11,23",
  korisnicko_ime: "admindejan",
  sifra_korisnika: "vjIj97o2",
  organizacija: 1012,
  organizacija_naziv: "KLINIKA ZA KARDIOLOGIJU",
  organizacija_sifra: "1012",
  organizacija_odjel: 10126,
  organizacija_odjel_naziv: "Koronarno odjeljenje",
  izabrano_skladiste: 10126,
  izabrana_grupa_skladista: 1012,
  poslovna_godina: 2024,
  obavjestenje: "",
  aplikacija: "bisa_2",
  nacin_rada: "klinika",
  ezdravstvo_korisnicko_ime: null,
  ezdravstvo_lozinka: null,
  izis_ljekar_id: "",
  izis_ljekar_jmbg: "",
  izis_ljekar_ime: "",
  izis_ljekar_prezime: "",
  izis_ustanova_id: "4596",
  izis_ustanova_ime: "Klinika za kardiologiju",
  izis_ustanova_ulica: "Dvanaest beba bb",
  izis_ustanova_grad: "Banja Luka",
  izis_ustanova_ptt_broj: "78000",
  izis_ustanova_drzava: "BA"
}
