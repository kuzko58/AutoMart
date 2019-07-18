import Router from 'express';
import Cars from '../controllers/cars';
import Orders from '../controllers/orders';
import Flags from '../controllers/flags';
import Users from '../controllers/users';
import auth from '../middlewares/authentication';
import validator from '../middlewares/validation';
import multer from '../middlewares/multer';
import Cloudinary from '../config/cloudinary';
import imgUrl from '../middlewares/imgUrl';

const router = Router();
const protect = auth.verifyToken;
const authenticate = auth.identify;
const { multerUploads } = multer;
const { cloudinaryConfig } = Cloudinary;

router.post('/auth/signup', validator.userSignUp, Users.createUserAccount);
router.post('/auth/signin', validator.userSignIn, Users.logInUser);
router.post('/car/', protect, cloudinaryConfig, multerUploads, imgUrl, validator.createAd, Cars.createNewAdvert);
router.post('/order/', protect, validator.createOrder, Orders.createNewOrder);
router.post('/flag/', protect, validator.createFlag, Flags.createNewFlag);

router.patch('/order/:orderId/price', protect, validator.updateOrder, Orders.updateOrder);
router.patch('/car/:carId/status', protect, validator.updateAd, Cars.updateAdvert);
router.patch('/car/:carId/price', protect, validator.updateAd, Cars.updateAdvert);

router.get('/car/:carId', Cars.getSpecificAdvert);
router.get('/car', Cars.getAllAdverts);
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&state=new ?status=available&state=used
?status=available&manufacturer=XXXValue ?body_type=BodyType]
*/
router.get('/user/:userId/car/', protect, Cars.getAllUserAdvert);
router.delete('/car/:carId/', protect, authenticate, Cars.deleteAdvert);

export default router;
