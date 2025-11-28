import {backendUrl} from "./dev_env.js";
import dayjs from "dayjs";

export const formatDatum = 'DD.MM.YYYY';
export const formatDatumiVrijeme = 'DD.MM.YYYY HH:mm';
export const vrijemeFormatZaBazu = 'YYYY-MM-DD';

export const postaviSifrarnik = async (model, setSifrarnik, posebno = '') => {
  const odgovor = await povuciPodatke(`${model}.cfc?method=${posebno || 'dohvati_sve'}`);

  if (!odgovor.greska) {
    const novaLista = mapiranjePodatakaSaBekenda(odgovor.lista);
    setSifrarnik(novaLista);
    return novaLista;
  }
  else setSifrarnik([]);
  return [];
}

export const mapiranjePodatakaSaBekenda = ({data, columns}) => {
  return data.map(row => {
    const record = {};
    row.forEach((value, index) => {
      const columnName = columns[index];
      if ((columnName.includes('datum') || columnName === 'timestamp') && value) {
        const datum = dayjs(value);
        record[columnName] = datum;
        record[`${columnName}_format`] = columnName === 'timestamp' ? datum.format(formatDatumiVrijeme) : datum.format(formatDatum);
      } else record[columnName] = value;
    });
    return record;
  });
}

export const napraviBodyZaSlanje = podaci => {
  const newData = new URLSearchParams();
  const podaciZaSlanje = {...podaci};

  for (const podaciZaSlanjeKey in podaciZaSlanje) {
    if (podaciZaSlanjeKey.includes('format')) continue;
    if ((podaciZaSlanjeKey.includes('datum') || podaciZaSlanjeKey === 'timestamp') && podaciZaSlanje[podaciZaSlanjeKey])
      podaciZaSlanje[podaciZaSlanjeKey] = podaciZaSlanje[podaciZaSlanjeKey].format(vrijemeFormatZaBazu);
    if (podaciZaSlanje[podaciZaSlanjeKey] !== null && podaciZaSlanje[podaciZaSlanjeKey] !== undefined)
      newData.append(podaciZaSlanjeKey, podaciZaSlanje[podaciZaSlanjeKey]);
  }

  return newData;
}

export const povuciPodatke = async (method) => {
  const response = await fetch(`${backendUrl}${method}`);

  return await response.json();
}

export const povuciSesiju = async (url) => {
  const response = await fetch(`${url}/kis/common/common.cfc?method=get_session`);

  return await response.json();
}

export const povuciVerziju = async () => {
  const odgovor = await povuciPodatke(`Sifrarnici.cfc?method=dohvati_sve_verzije`);

  if (!odgovor.greska) {
    return mapiranjePodatakaSaBekenda(odgovor.lista);
  }
}

export const posaljiPodatke = async (method, podaci) => {
  const data = napraviBodyZaSlanje(podaci);
  const responose = await fetch(`${backendUrl}${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });
  return await responose.json();
}