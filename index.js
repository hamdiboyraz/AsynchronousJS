const fs = require('fs');
const superagent = require('superagent'); // Enables us to make HTTP Request

// CALLBACK
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     });
// });

// ------------------------------------------------------------------------------------

// PROMISE ES6
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// ------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------

// 1. Write with Promises
// readFileProm(`${__dirname}/dog.txt`) // Returns promise
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // Returns promise
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFileProm('dog-img.txt', res.body.message); // Returns promise
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ------------------------------------------------------------------------------------

// 2. Write with Async/Await ES8 Feature
// const getDogPic = async () => {
//   try {
//     const data = await readFileProm(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data}`);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     console.log(res.body.message);

//     await writeFileProm('dog-img.txt', res.body.message); // Don't need assign a variable
//     console.log('Random dog image saved to file!');
//   } catch (err) {
//     console.log(err);
//   }
// };

// getDogPic();

// ------------------------------------------------------------------------------------

// Return Values from Async Func
const getDogPic = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dogs.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFileProm('dog-img.txt', res.body.message); // Don't need assign a variable
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
  }
  return '2: READY';
};

console.log('1: Will get dog pics!');
getDogPic().then((x) => {
  console.log(x);
  console.log('3: Done Getting dog pics!');
});
