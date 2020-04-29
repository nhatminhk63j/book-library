var cloundinary = require('cloudinary').v2;

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

var self = module.exports = {
    uploadSingle: (file) => {
        return new Promise(resolve => {
            cloundinary.uploader.upload(file, {
                folder: 'single'
            })
            .then(result => {
                if(result) {
                    const fs = require('fs');
                    fs.unlinkSync(file);
                    resolve({
                        url: result.secure_url,
                        id: result.public_id
                    })
                }
            })
        })
    },
    uploadMultiple: (file) => {
        return new Promise(resolve => {
            cloundinary.uploader.upload(file => {
                folder: 'home'
            })
            .then(result => {
                if(result) {
                    const fs = require('fs');
                    fs.unlinkSync(file);
                    resolve({
                        url: result.secure_url,
                        id: result.public_id,
                        thumb1: self.reSizeImage(result.public_id, 200, 200),
                        main: self.reSizeImage(result.public_id, 500, 500),
                        thumb2: self.reSizeImage(result.public_id, 300, 300)
                    })
                }
            })
        })
    },
    reSizeImage: (id, h, w) => {
        return cloundinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            formate: 'jpg'
        })
    }
}