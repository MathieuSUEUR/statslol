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
      const platform = (region as string) || 'euw1';
      
      // 1. Récupération du compte (PUUID)
      const account = await RiotService.getAccountByRiotId(
        gameName as string,
        tagline as string,
        platform
      );

      if (!account) {
        return res.status(404).json({ error: 'Player not found' });
      }

      // 2. Récupération du profil Summoner (Level, Icon) via le PUUID
      const summoner = await RiotService.getSummonerByPuuid(platform, account.puuid);

      // Fusion des données
      const result = {
        ...account,
        summonerLevel: summoner?.summonerLevel,
        profileIconId: summoner?.profileIconId,
        revisionDate: summoner?.revisionDate
      };
      
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }

  }
}
