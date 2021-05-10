import { callApi } from '../helpers/apiHelper';
import { showModal } from '../components/modal/modal';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    try {
      const endpoint = `details/fighter/${id}.json`;
      const fighterInfo = await callApi (endpoint, "GET");
      return fighterInfo;
    } catch(error) {
      throw error;
    }

  }
}

export const fighterService = new FighterService();
