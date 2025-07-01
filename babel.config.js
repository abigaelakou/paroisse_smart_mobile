/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 28/06/2025 - 21:42:27
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
    };
};