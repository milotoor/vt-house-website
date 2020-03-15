/**
 * Resizes images from their full size to a specified width. This is done so
 * that we can manipulate images without overwriting the originals.
 */
const fs = require('fs');
const jimp = require('jimp');
const path = require('path');
const yargs = require('yargs');


function getImageNames (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);

      // Unable to load the files in the directory for some reason
      if (files) resolve(files);
      else reject();
    });
  });
}

async function resizeImages (dir, width, adjacent) {
  // Load the images in the directory
  const imageNames = await getImageNames(dir);

  // Check that the `resized` directory exists, and make it if it does not
  const outDir = path.join(dir, adjacent ? '../resized' : 'resized');
  try {
    fs.statSync(outDir);
  } catch (e) {
    fs.mkdirSync(outDir);
  }

  // Iterate through the images and resize them one by one
  imageNames.forEach((name) => {
    resizeImage(dir, outDir, name, width)
      .error(e => `Image resizing failed with error: ${e}`);
  });
}

async function resizeImage (imageDir, outputDir, name, width) {
  let image;
  try {
    image = await jimp.read(path.join(imageDir, name));
  } catch (e) {
    console.log(`ERROR: Unable to resize image "${name}"`);
    return;
  }

  const imageWidth = image.getWidth();
  const imageHeight = image.getHeight();

  if (imageWidth < width) {
    console.warn(`Warning: image "${name}" has width ${imageWidth} which is less than ${width}`);
  } else {
    console.log(`Resizing image "${name}"`);
  }

  image
    .resize(width, Math.round(width / imageWidth * imageHeight))
    .write(path.join(outputDir, name));
}

// Parse arguments
const argv = yargs
  .usage('Usage: $0 [path to directory] --width [num] [--adjacent]')
  .demandOption(['width'])
  .demandCommand(1)
  .alias('w', 'width')
  .alias('a', 'adjacent')
  .argv;

resizeImages(argv._[0], argv.width, argv.adjacent)
  .error(e => console.error(`Image resizing failed with error: ${e}`));
