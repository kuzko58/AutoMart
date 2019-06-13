import Router from 'express';
import adverts from '../controllers/adverts';

const router = Router();

router.get('/advert/', adverts.getAllAdverts);
router.delete('/advert/:advertId/', adverts.deleteAdvert);

export default router;
