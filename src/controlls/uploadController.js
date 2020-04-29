'use strict'
const cloudinary = require('../models/cloudinaryModel');

var self = module.exports = {
    uploadSingleFile: async(req, res, next) => {
        cloudinary.uploadSingle(req.file.path).then(result => {
            let imageDetails = {
                imageName: req.body.imageName || '',
                cloudImage: result.url,
                imageId: result.id
            }
            req.imageDetails = imageDetails;
            next();
        })
        // res.json(req.file);
    },
    uploadMultipleFiles: async(req, res, next) => {
        let resPromises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.uploadMultiple(file.path).then(result => {
                resolve(result);
            })
        }))

        Promise.all(resPromises)
        .then(async (arrImg) => {
            // res.json(req.files);
            // luu array image to database
        })
        .catch(error => console.log(error));
        
    }
}