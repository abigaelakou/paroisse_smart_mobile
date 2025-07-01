/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 18/06/2025 - 15:27:42
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 18/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
// updateApiUrl.js
const fs = require('fs');
const path = require('path');
const http = require('http');

const CONFIG_PATH = path.join(__dirname, 'src', 'services', 'config.js');

http.get('http://127.0.0.1:4040/api/tunnels', (res) => {
    let data = '';

    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const tunnels = JSON.parse(data).tunnels;
            const httpsTunnel = tunnels.find(t => t.public_url.startsWith('https'));
            if (!httpsTunnel) throw new Error('Aucun tunnel HTTPS trouvé.');

            const apiUrl = `${httpsTunnel.public_url}/api`;
            const content = `export const API_URL = '${apiUrl}';\n`;

            fs.writeFileSync(CONFIG_PATH, content);
            console.log(`✅ API_URL mis à jour : ${apiUrl}`);
        } catch (error) {
            console.error('❌ Erreur de traitement JSON ou d’écriture du fichier :', error.message);
        }
    });
}).on('error', (err) => {
    console.error('❌ Impossible de se connecter à ngrok sur 127.0.0.1:4040 :', err.message);
});