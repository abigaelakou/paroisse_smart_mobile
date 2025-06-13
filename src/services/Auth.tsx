/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 22/05/2025 - 11:23:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/05/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import axios from 'axios';
import { API_URL } from './config';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('Réponse API:', response.data);
    return response.data;
  } catch (error) {
    console.log('Erreur API:', error.response?.data || error.message);
    return { status: false, message: 'Connexion échouée' };
  }
};
