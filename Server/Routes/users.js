import Router from 'express';
import content from '../controllers/content';
import members from '../controllers/members';

const router = Router();

router.post('/auth/signup', members.createUserAccount);
router.post('/auth/signin', members.logInUser);
router.post('/advert/', content.adverts.createNewContent.bind(content.adverts));
router.post('/order/', content.orders.createNewContent.bind(content.orders));
router.post('/flag/', content.flags.createNewContent.bind(content.flags));

router.patch('/order/:orderId/price', content.orders.updateOrderPrice.bind(content.orders));
router.patch('/advert/:advertId/status', content.adverts.updateContent.bind(content.adverts));
router.patch('/advert/:advertId/price', content.adverts.updateContent.bind(content.adverts));

router.get('/advert/:advertId', content.adverts.getSpecificContent.bind(content.adverts));
router.get('/advert', content.adverts.getFilteredAdverts.bind(content.adverts));
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&condition=new ?status=available&condition=used
?status=available&brand=XXXValue ?body_type=bodyType]
*/
router.get('/user/:userId/advert/', content.adverts.getAllUserContent.bind(content.adverts));

export default router;
