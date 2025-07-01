/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 20/06/2025 - 16:45:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import Constants from "expo-constants";

export const ENV = Constants ?.expoConfig?.extra ?.env ?? process.env.ENV ?? "dev";
