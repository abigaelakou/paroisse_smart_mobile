/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 06/06/2025 - 20:23:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
// src/services/HomeService.ts
import axios from 'axios';
import { API_URL } from './config';

export const fetchHomeData = async () => {
  const [nouvelles, annonces, pain] = await Promise.all([
    axios.get(`${API_URL}/nouvelles`),
    axios.get(`${API_URL}/annonces-semaine`),
    axios.get(`${API_URL}/pain-du-jour`)
  ]);

  return {
    nouvelles: nouvelles.data,
    annonces: annonces.data,
    pain: pain.data
  };
};
