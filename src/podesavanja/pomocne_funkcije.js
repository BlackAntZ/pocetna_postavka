import {okruzenje, productionUrl, testniUrl} from "./razvojno_okruzenje.js";
import dayjs from "dayjs";
export const formatDatum = 'DD.MM.YYYY';
export const formatDatumiVrijeme = 'DD.MM.YYYY HH:mm';
export const vrijemeFormatZaBazu = 'YYYY-MM-DD';

export const postaviSifrarnik = async (method, setSifrarnik, kljuc) => {
  const odgovor = await povuciPodatke(method);

  if (!odgovor.greska) setSifrarnik(mapiranjePodatakaSaBekenda(odgovor[kljuc]));
  else setSifrarnik([]);
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
      }
      else record[columnName] = value;
    });
    return record;
  });
}

export const napraviBodyZaSlanje = podaci => {
  const newData = new URLSearchParams();

  for (const podaciKey in podaci) {
    if (podaci[podaciKey] !== null && podaci[podaciKey] !== '' && podaci[podaciKey] !== undefined) newData.append(podaciKey, podaci[podaciKey]);
  }

  return newData;
}

export const povuciPodatke = async (method) => {
  const response = await fetch(`${okruzenje === 'test' ? testniUrl : productionUrl}${method}`);

  return await response.json();
}

export const posaljiPodatke = async (method, podaci) => {
  const data = napraviBodyZaSlanje(podaci);
  const responose = await fetch(`${okruzenje === 'test' ? testniUrl : productionUrl}${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });
  return await responose.json();
}