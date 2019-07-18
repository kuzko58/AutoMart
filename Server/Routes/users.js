import Router from 'express';
import content from '../controllers/content';
import members from '../controllers/members';
import auth from '../middlewares/authentication';
import validator from '../middlewares/validation';

const router = Router();
const protect = auth.verifyToken;
const authenticate = auth.identify;
const Adverts = content.adverts;
const Orders = content.orders;
const Flags = content.flags;

router.post('/auth/signup', validator.userSignUp, members.createUserAccount);
router.post('/auth/signin', validator.userSignIn, members.logInUser);
router.post('/advert/', protect, validator.createAd, Adverts.createNewContent.bind(Adverts));
router.post('/order/', protect, validator.createOrder, Orders.createNewContent.bind(Orders));
router.post('/flag/', protect, validator.createFlag, Flags.createNewContent.bind(Flags));

router.patch('/order/:orderId/price', protect, validator.updateOrder, Orders.updateOrderPrice.bind(Orders));
router.patch('/advert/:advertId/status', protect, validator.updateAd, Adverts.updateContent.bind(Adverts));
router.patch('/advert/:advertId/price', protect, validator.updateAd, Adverts.updateContent.bind(Adverts));

router.get('/advert/:advertId', Adverts.getSpecificContent.bind(Adverts));
router.get('/advert', Adverts.getAllAdverts.bind(Adverts));
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&condition=new ?status=available&condition=used
?status=available&brand=XXXValue ?body_type=bodyType]
*/
router.get('/user/:userId/advert/', protect, Adverts.getAllUserContent.bind(Adverts));
router.delete('/advert/:advertId/', protect, authenticate, Adverts.deleteContent.bind(Adverts));

export default router;
