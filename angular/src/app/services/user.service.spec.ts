import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let keycloakInstanceSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('KeycloakService', ['getUsername', 'loadUserProfile', 'getKeycloakInstance', 'logout', 'clearToken']);
    keycloakInstanceSpy = jasmine.createSpyObj('KeycloakInstance', ['accountManagement']);
    spy.getKeycloakInstance.and.returnValue(keycloakInstanceSpy);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: KeycloakService, useValue: spy }
      ]
    });
    service = TestBed.inject(UserService);
    keycloakServiceSpy = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsername on KeycloakService', () => {
    keycloakServiceSpy.getUsername.and.returnValue('test-user');
    const username = service.getUsername();
    expect(username).toBe('test-user');
    expect(keycloakServiceSpy.getUsername).toHaveBeenCalled();
  });

  it('should call loadUserProfile on KeycloakService', async () => {
    const profile = { username: 'test-user' };
    keycloakServiceSpy.loadUserProfile.and.returnValue(Promise.resolve(profile as any));
    const res = await service.loadUserProfile();
    expect(res).toBe(profile as any);
    expect(keycloakServiceSpy.loadUserProfile).toHaveBeenCalled();
  });

  it('should call accountManagement on KeycloakInstance', () => {
    service.accountManagement();
    expect(keycloakServiceSpy.getKeycloakInstance).toHaveBeenCalled();
    expect(keycloakInstanceSpy.accountManagement).toHaveBeenCalled();
  });

  it('should call logout and then clearToken on KeycloakService', async () => {
    keycloakServiceSpy.logout.and.returnValue(Promise.resolve());
    // clearToken is called in the .then() block of logout()
    await service.logout();

    expect(keycloakServiceSpy.logout).toHaveBeenCalled();
    expect(keycloakServiceSpy.clearToken).toHaveBeenCalled();
  });
});
