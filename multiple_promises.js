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

const getDogPic = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    // Waits until all of them resolve.
    const all = await Promise.all([res1Prom, res2Prom, res3Prom]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFileProm('dog-img.txt', imgs.join('\n')); // Don't need assign a variable
    console.log('Random dog images saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};

// IIFE(Immediately Invoked Func Expression)
(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done Getting dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();
