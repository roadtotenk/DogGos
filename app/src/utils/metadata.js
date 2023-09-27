export const getAnimalMetadataQuery = (tableName, animalId) => {
  const sql = `SELECT
          json_object(
              'name', name,
              'image', image_url,
              'external_url', url,
              'description', description,
              'attributes',
              json_array(
                  json_object('trait_type', 'Primary Breed', 'value', primary_breed),
                  json_object('trait_type', 'Secondary Breed', 'value', secondary_breed),
                  json_object('trait_type', 'Secondary Breed', 'value', secondary_breed),
                  json_object('trait_type', 'Mixed Breed', 'value', is_mixed),
                  json_object('trait_type', 'Primary Color', 'value', primary_color),
                  json_object('trait_type', 'Secondary Color', 'value', secondary_color),
                  json_object('trait_type', 'age', 'value', age),
                  json_object('trait_type', 'gender', 'value', gender)
              )
          ) as dog
      FROM
          ${tableName}
      WHERE
          id=${animalId};`;

  return sql.replace(/\n|\r|\t/g, "").replace(/  +/g, " ");
};
