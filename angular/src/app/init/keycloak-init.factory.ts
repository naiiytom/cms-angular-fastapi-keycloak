import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(
    keycloak: KeycloakService,
) {
    return async () => {
        try {
            await keycloak.init({
                config: {
//                     url: 'http://localhost:8080/auth',
                    url: `https://${ window.location.host }/auth`,
                    realm: 'chatbot',
                    clientId: 'chatbot',
                },
                initOptions: {
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: `${ window.location.origin }/assets/silent-check-sso.html`,
                    // checkLoginIframe: true,
                },
                loadUserProfileAtStartUp: false,
                enableBearerInterceptor: true,
            });

        } catch (e) {
            console.error('Failed to initialize Keycloak', e);
        }
    };
}
