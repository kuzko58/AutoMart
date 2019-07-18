import multer from './multer';
import Cloudinary from '../config/cloudinary';

const { dataUri } = multer;
const { uploader } = Cloudinary;

const imgUrl = (req, res, next) => {
  if (req.files) {
    req.body.photo = [];
    const files = dataUri(req);

    new Promise((resolve) => {
      files.forEach((file) => {
        uploader.upload(file.content)
          .then((result) => {
            req.body.photo.push(result.url);
            if (req.body.photo.length === files.length) {
              resolve();
            }
          });
      });
    })
      .then(() => next())
      .catch(e => res.status(400).json(e));
  } else next();
};

export default imgUrl;
