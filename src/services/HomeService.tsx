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
// services/HomeService.js
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

export const fetchHomeData = async () => {
  try {
    const [nouvellesRes, annoncesRes, painRes] = await Promise.all([
      axios.get(`${API_URL}/nouvelles`).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/annonces-semaine`).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/pain-du-jour`).catch(() => ({ data: null })),
    ]);

    return {
      nouvelles: nouvellesRes.data,
      annonces: annoncesRes.data,
      pain: painRes.data,
    };
  } catch (error) {
    console.error("Erreur fetchHomeData :", error);
    return {
      nouvelles: [],
      annonces: [],
      pain: null,
    };
  }
};
