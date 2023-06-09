import { Directus } from '@directus/sdk';
import { api } from '../const';

export const directus = new Directus(api, {
  storage: {
    prefix: 'zack',
    mode: 'LocalStorage', // 'MemoryStorage' in Node.js
  },
});

export const directusPublic = new Directus(api);
