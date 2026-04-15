import axios from 'axios';
import https from 'https';

// In-memory cache simple pour le MVP
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '300') * 1000;

export class RiotService {
  private static readonly API_KEY = process.env.RIOT_API_KEY;
  
  /**
   * Retourne la région de routage (europe, americas, asia) à partir d'une plateforme (euw1, na1, kr, etc.)
   */
  private static getRoutingRegion(platform: string): string {
    const mapping: { [key: string]: string } = {
      euw1: 'europe',
      eun1: 'europe',
      tr1: 'europe',
      ru: 'europe',
      na1: 'americas',
      br1: 'americas',
      la1: 'americas',
      la2: 'americas',
      kr: 'asia',
      jp1: 'asia',
    };
    return mapping[platform.toLowerCase()] || 'europe';
  }

  /**
   * Récupère un compte Riot par Riot ID et Tagline (API ACCOUNT-V1)
   * @param gameName Nom en jeu
   * @param tagline Tagline (sans le #)
   * @param platform Plateforme (ex: euw1, na1, kr)
   */
  static async getAccountByRiotId(gameName: string, tagline: string, platform: string = 'euw1') {
    const routingRegion = this.getRoutingRegion(platform);
    const key = (this.API_KEY || '').trim();
    console.log(`[Debug] API Key Length: ${key.length}, Starts with: ${key.substring(0, 7)}`);
    
    const cacheKey = `account-${gameName}-${tagline}-${routingRegion}`;
    
    // Vérification du cache
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    try {
      const url = `https://${routingRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagline)}?api_key=${this.API_KEY}`;
      console.log(`[RiotAPI] Fetching Account: ${url.split('=')[0]}=RGAPI-***`);
      
      const response = await axios.get(url, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Origin': 'https://developer.riotgames.com',
          'Accept': 'application/json'
        },
        timeout: 15000,
        httpsAgent: new https.Agent({ keepAlive: false }),
        family: 4
      });


      // Stockage en cache
      cache.set(cacheKey, {
        data: response.data,
        expiry: Date.now() + CACHE_TTL
      });

      return response.data;
    } catch (error: any) {
      console.error(`[RiotAPI] Error Detail [${error.code || 'NO_CODE'}]:`, error.message);
      this.handleApiError(error);
    }

  }

  /**
   * Récupère les infos d'un Summoner par PUUID (API SUMMONER-V4)
   * @param platform Plateforme (ex: euw1, na1, kr)
   * @param puuid PUUID Riot
   */
  static async getSummonerByPuuid(platform: string, puuid: string) {
    const cacheKey = `summoner-${platform}-${puuid}`;
    
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    try {
      const url = `https://${platform.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
      const response = await axios.get(url, {
        headers: { 'X-Riot-Token': this.API_KEY }
      });

      cache.set(cacheKey, {
        data: response.data,
        expiry: Date.now() + CACHE_TTL
      });

      return response.data;
    } catch (error: any) {
      this.handleApiError(error);
    }
  }

  private static handleApiError(error: any) {
    if (error.code) {
      console.error(`[RiotAPI] Network/Socket Error: ${error.code}`);
    }
    if (error.response) {
      const status = error.response.status;
      console.error(`[RiotAPI] API returned Status: ${status}`);
      if (status === 429) {
        throw new Error('Riot API Rate limit exceeded. Please try again later.');
      }
      if (status === 403) {
        throw new Error('Riot API Key invalid or expired.');
      }
      if (status === 404) {
        return null; // On laisse le contrôleur gérer le 404
      }
    }
    throw error;
  }
}

