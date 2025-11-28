import {backendUrl} from "../settings/dev_env.js";

const vrijemeFormatZaBazu = 'YYYY-MM-DD';

const createCfcBody = data => {
  const newData = new URLSearchParams();
  const tempObject = {...data};

  for (const tempObjectKey in tempObject) {
    if (tempObjectKey.includes('format')) continue;
    if ((tempObjectKey.includes('datum') || tempObjectKey === 'timestamp') && tempObject[tempObjectKey])
      tempObject[tempObjectKey] = tempObject[tempObjectKey].format(vrijemeFormatZaBazu);
    if (tempObject[tempObjectKey] !== null && tempObject[tempObjectKey] !== undefined)
      newData.append(tempObjectKey, tempObject[tempObjectKey]);
  }

  return newData;
}

export const postData = async (method, podaci) => {
  const data = createCfcBody(podaci);
  const responose = await fetch(`${backendUrl}${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });
  return await responose.json();
}