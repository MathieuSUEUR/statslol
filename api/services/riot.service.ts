import axios from 'axios';

// In-memory cache simple pour le MVP
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '300') * 1000;

export class RiotService {
  private static readonly API_KEY = process.env.RIOT_API_KEY;
  
  /**
   * Récupère un compte Riot par Riot ID et Tagline
   * @param gameName Nom en jeu
   * @param tagline Tagline (sans le #)
   * @param region Région Riot (ex: europe)
   */
  static async getAccountByRiotId(gameName: string, tagline: string, region: string = 'europe') {
    const cacheKey = `account-${gameName}-${tagline}-${region}`;
    
    // Vérification du cache
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      console.log(`[Cache] Hit for ${cacheKey}`);
      return cached.data;
    }

    try {
      const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagline}`;
      const response = await axios.get(url, {
        headers: { 'X-Riot-Token': this.API_KEY }
      });

      // Stockage en cache
      cache.set(cacheKey, {
        data: response.data,
        expiry: Date.now() + CACHE_TTL
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Riot API Rate limit exceeded. Please try again later.');
      }
      throw error;
    }
  }

  // Autres méthodes pour Match History, Stats, etc. à venir en Phase 2
}
