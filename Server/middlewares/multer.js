import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array('photo', 10);

const dUri = new Datauri();

const dataUri = req => req.files.map(file => dUri.format(
  path.extname(file.originalname).toString(), file.buffer,
));

export default { multerUploads, dataUri };
