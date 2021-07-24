import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private keycloakService: KeycloakService,
    ) { }

    public getUsername() {
        return this.keycloakService.getUsername();
    }

    public loadUserProfile() {
        return this.keycloakService.loadUserProfile();
    }

    public accountManagement() {
        return this.keycloakService.getKeycloakInstance().accountManagement();
    }

    public logout() {
        return this.keycloakService.logout().then(() => this.clearToken());
    }

    private clearToken() {
        return this.keycloakService.clearToken();
    }
}
