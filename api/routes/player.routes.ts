import { Router } from 'express';
import { PlayerController } from '../controllers/player.controller';

const router = Router();

// GET /api/players/search?gameName=Hide%20on%20bush&tagline=KR1
router.get('/search', PlayerController.searchPlayer);

export default router;
