/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 28/06/2025 - 20:18:32
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
/**
 * metro.config.js
 * Configuration basique Metro bundler
 */
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async() => {
    const config = await getDefaultConfig(__dirname);

    // Ajouter les extensions d'assets
    config.resolver.assetExts.push("jpg", "jpeg", "png");

    // Configurer le transformer (optionnel)
    config.transformer.getTransformOptions = async() => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
        },
    });

    return config;
})();