const fs = require('fs');
const superagent = require('superagent'); // Enables us to make HTTP Request

// Building our Promise
const readFileProm = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file');
      resolve('Success');
    });
  });
};

// 1. Write with Promises
readFileProm(`${__dirname}/dog.txt`) // Returns promise
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // Returns promise
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFileProm('dog-img.txt', res.body.message); // Returns promise
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    console.log(err);
  });
