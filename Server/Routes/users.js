import Router from 'express';
import content from '../controllers/content';
import members from '../controllers/members';
import auth from '../middlewares/authentication';

const router = Router();

router.post('/auth/signup', members.createUserAccount);
router.post('/auth/signin', members.logInUser);
router.post('/advert/', auth.verifyToken, content.adverts.createNewContent.bind(content.adverts));
router.post('/order/', auth.verifyToken, content.orders.createNewContent.bind(content.orders));
router.post('/flag/', auth.verifyToken, content.flags.createNewContent.bind(content.flags));

router.patch('/order/:orderId/price', auth.verifyToken, content.orders.updateOrderPrice.bind(content.orders));
router.patch('/advert/:advertId/status', auth.verifyToken, content.adverts.updateContent.bind(content.adverts));
router.patch('/advert/:advertId/price', auth.verifyToken, content.adverts.updateContent.bind(content.adverts));

router.get('/advert/:advertId', content.adverts.getSpecificContent.bind(content.adverts));
router.get('/advert', content.adverts.getFilteredAdverts.bind(content.adverts));
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&condition=new ?status=available&condition=used
?status=available&brand=XXXValue ?body_type=bodyType]
*/
router.get('/user/:userId/advert/', auth.verifyToken, content.adverts.getAllUserContent.bind(content.adverts));
router.get('/advert/', auth.verifyToken, auth.identify, content.adverts.getAllContent.bind(content.adverts));
router.delete('/advert/:advertId/', auth.verifyToken, auth.identify, content.adverts.deleteContent.bind(content.adverts));

export default router;
