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