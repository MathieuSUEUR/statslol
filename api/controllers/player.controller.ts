import { Request, Response, NextFunction } from 'express';
import { RiotService } from '../services/riot.service';

export class PlayerController {
  /**
   * Recherche un joueur par son Riot ID
   */
  static async searchPlayer(req: Request, res: Response, next: NextFunction) {
    const { gameName, tagline, region } = req.query;

    if (!gameName || !tagline) {
      return res.status(400).json({ error: 'gameName and tagline are required' });
    }

    try {
      const account = await RiotService.getAccountByRiotId(
        gameName as string,
        tagline as string,
        (region as string) || 'europe'
      );
      
      return res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
}
