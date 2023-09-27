export const adoptAnimal = (animalId) => {
  console.log(animalId);
  let animalData = null;
  fetch(
    fetch(
      `${process.env.REACT_APP_FUNCTIONS_ENDPOINT}adoptAnimal?id=${animalId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  );

  return animalData;
};
