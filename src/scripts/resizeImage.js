#!/usr/bin/env node

/**
 * Resizes images from their full size to a specified width. This is done so
 * that we can manipulate images without overwriting the originals.
 */
const fs = require('fs');
const jimp = require('jimp');
const path = require('path');
const yargs = require('yargs');


function renameImage (imagePath) {
  const suffixIndex = imagePath.lastIndexOf('.');
  const pathNoSuffix = imagePath.slice(0, suffixIndex);
  return `${pathNoSuffix}-resized${imagePath.slice(suffixIndex)}`;
}

async function resizeImage (imagePath, width) {
  let image;
  try {
    image = await jimp.read(imagePath);
  } catch (e) {
    console.log(`ERROR: Unable to resize image "${imagePath}"`);
    return;
  }

  const imageWidth = image.getWidth();
  const imageHeight = image.getHeight();

  if (imageWidth < width) {
    console.warn(`Warning: image "${imagePath}" has width ${imageWidth} which is less than ${width}`);
  } else {
    console.log(`Resizing image "${imagePath}"`);
  }

  image
    .resize(width, Math.round(width / imageWidth * imageHeight))
    .write(renameImage(imagePath));
}

// Parse arguments
const argv = yargs
  .usage('Usage: $0 [path to image] --width [num]')
  .demandOption(['width'])
  .demandCommand(1)
  .alias('w', 'width')
  .argv;

resizeImage(argv._[0], argv.width)
  .catch(e => console.error(`Image resizing failed with error: ${e}`));
