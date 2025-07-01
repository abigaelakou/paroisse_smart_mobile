/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 20/06/2025 - 16:51:06
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 20/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/

export default ({ config }) => {
    const env = process.env.ENV || "dev";

    const apiUrls = {
        dev: 'https://831b-160-154-92-56.ngrok-free.app/api',
        preview: "https://9fdb-160-154-92-56.ngrok-free.app/api",
        production: "https://api.paroisse-smart.com/api"
    };
    cli: {
        appVersionSource: "project"
    }
    return {
        ...config,
        name: "Paroisse Smart",
        slug: "paroisse-smart",
        owner: "h2a",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/logo/logo1.png",
        userInterfaceStyle: "green",
        newArchEnabled: true,
        splash: {
            image: "./assets/logo/logo2.png",
            resizeMode: "contain",
            backgroundColor: "#228B22"
        },
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/logo/logo2.png",
                backgroundColor: "#228B22"
            },
            edgeToEdgeEnabled: true,
            package: "com.h2a.paroissesmart"
        },
        web: {
            favicon: "./assets/logo/logo2.png"
        },
        updates: {
            // enabled: env === "production"
            enabled: false
        },
        extra: {
            eas: {
                projectId: "bfa61882-4192-46fc-9816-fc930dd94d02"
            },
            env,
            API_URL: apiUrls[env]
        }
    };
};