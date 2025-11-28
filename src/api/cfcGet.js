import {backendUrl} from "../settings/dev_env.js";

export const mapCfcBackendData = ({data, columns}) => {
  return data.map(row => {
    const record = {};
    row.forEach((value, index) => {
      const columnName = columns[index];

      record[columnName] = value;
    });
    return record;
  });
}

const getData = async (method) => {
  const response = await fetch(`${backendUrl}${method}`);

  return await response.json();
}

export const setDataState = async (model, setData) => {
  const odgovor = await getData(`${model}.cfc?method=dohvati_sve`);

  if (!odgovor.greska) {
    const novaLista = mapCfcBackendData(odgovor.lista);
    setData(novaLista);
    return novaLista;
  }
  else setData([]);
  return [];
}