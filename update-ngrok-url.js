/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 23/06/2025 - 10:00:21
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 23/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
const fs = require("fs");
const path = require("path");
const http = require("http"); // <-- utiliser http au lieu de https

const NGROK_API_URL = "http://127.0.0.1:4040/api/tunnels";

http.get(NGROK_API_URL, (res) => {
    let data = "";

    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        try {
            const tunnels = JSON.parse(data).tunnels;
            const httpsTunnel = tunnels.find((t) => t.proto === "https");

            if (!httpsTunnel) {
                console.error("❌ Aucun tunnel HTTPS trouvé.");
                return;
            }

            const publicUrl = httpsTunnel.public_url;
            const configPath = path.resolve(__dirname, "app.config.js");

            fs.readFile(configPath, "utf8", (err, content) => {
                if (err) return console.error("Erreur lecture fichier:", err);

                const newContent = content.replace(
                    /dev:\s*['"`](.*?)['"`],/,
                    `dev: '${publicUrl}/api',`
                );

                fs.writeFile(configPath, newContent, "utf8", (err) => {
                    if (err) return console.error("Erreur écriture fichier:", err);
                    console.log(`✅ Ngrok URL mise à jour dans app.config.js : ${publicUrl}`);
                });
            });
        } catch (error) {
            console.error("Erreur parsing JSON :", error.message);
        }
    });
}).on("error", (err) => {
    console.error("❌ Erreur lors de la requête à Ngrok :", err.message);
});