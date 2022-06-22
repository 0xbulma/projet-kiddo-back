import getFieldNames from 'graphql-list-fields';

const getFields = (info) => {
  const fields = getFieldNames(info);

  // EN ATTENTE D'ACTIVATION DU POPULATE - CODE A REVOIR EN FONCTION DU NIVEAU DES CHAMPS//

  // console.log(fields);
  // const documentFields = getFieldNames(info)
  //   .filter(field => !field.includes('.'));

  // const populateFields = getFieldNames(info)
  //   .filter(field => field.includes('.'))
  //   .map(field => field.split('.')[1]);

  return fields;
};

export default getFields;
