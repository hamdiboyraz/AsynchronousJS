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

// 2. Write with Async/Await ES8 Feature
const getDogPic = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`);
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
};

getDogPic();
