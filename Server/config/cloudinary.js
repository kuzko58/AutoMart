import { config, uploader } from 'cloudinary';
// import 'dotenv/config';

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: 'dynufzqxc',
    api_key: '244462474499457',
    api_secret: '8gHYCer-zJWp6u-3qxgw8O-7ipQ',
  });
  next();
};

export default { cloudinaryConfig, uploader };
