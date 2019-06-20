import Router from 'express';
import content from '../controllers/content';

const router = Router();

router.get('/advert/', content.adverts.getAllContent.bind(content.adverts));
router.delete('/advert/:advertId/', content.adverts.deleteContent.bind(content.adverts));

export default router;
