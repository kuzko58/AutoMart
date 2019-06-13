import Router from 'express';
import adverts from '../controllers/adverts';
import members from '../controllers/members';
import orders from '../controllers/orders';
import flags from '../controllers/flags';

const router = Router();

router.post('/auth/signup', members.createUserAccount);
router.post('/auth/signin', members.logInUser);
router.post('/advert/', adverts.createNewAdvert);
router.post('/order/', orders.createNewOrder);
router.post('/flag/', flags.createNewFlag);

router.patch('/order/:orderId/price', orders.updateOrderPrice);
router.patch('/advert/:advertId/status', adverts.updateAdvertStatus);
router.patch('/advert/:advertId/price', adverts.updateAdvertPrice);

router.get('/advert/:advertId', adverts.getSpecificAdvert);
router.get('/advert', adverts.getFilteredAdverts);
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&condition=new ?status=available&condition=used
?status=available&brand=XXXValue ?body_type=bodyType]
*/
router.get('/user/:userId/advert/', adverts.getAllUserAdverts);

export default router;
