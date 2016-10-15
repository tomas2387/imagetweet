"use strict";

const googleImages = require('google-images');
const config = require('./configuration.js');
const readLine = require('readline');

/** @var {Client} client */
let client = googleImages(config.GOOGLE_ID_SEARCH, config.GOOGLE_API_KEY);

const prompt = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

prompt.question("Type the search string:", (stringSearch) => {
    console.log("Searching images with the word '%s' \n", stringSearch);

    client.search(stringSearch)
        .then(printImagesMetadata);

    prompt.close();
});

/**
 *
 * @param {Array} images
 */
function printImagesMetadata(images) {
    images.forEach(printImageMetadata);
    return images;
}

/**
 * @param {Object} image
 * @param {String} image.type  ex. 'image/jpeg'
 * @param {String} image.width
 * @param {String} image.height
 * @param {String} image.size
 * @param {String} image.url
 * @param {Object} image.thumbnail
 * @param {String} image.thumbnail.url
 * @param {String} image.thumbnail.width
 * @param {String} image.thumbnail.height
 */
function printImageMetadata(image) {
    console.log(image.width+'x'+image.height+' - '+image.url);
}
