import { EncryptionService } from './encryption.service';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginResponseModel } from '../models/auth/loginResponseModel';
import { LoginRequestModel } from '../models/auth/loginRequestModel';
import { RegisterRequestModel } from '../models/auth/registerRequestModel';
import { ChangePasswordDto } from '../models/auth/changePasswordDto';
import { TokenUserModel } from '../models/auth/tokenUserModel';
import { JWTTokenClaim } from '../constants/jwtTokenClaim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl + '/Auth';
  isUserAuthenticated: boolean = false;
  preTestCompleted: boolean = false;
  isAuthSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private localStorage: LocalStorageService,
    private encryptionService: EncryptionService
  ) {
    this.isAuthSubject.next(this.isAuthenticated);
  }

  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.apiUrl}/login`,
      loginRequest
    );
  }
  refresh() {
    let encrypted = this.localStorage.get('refresh');
    let decrypted = this.encryptionService.get('123456$#@$^@1ERF', encrypted);
    this.login(JSON.parse(decrypted)).subscribe((response) => {
      this.setToken(response.token);
      if (response.token) {
        this.setAuthenticated(true);
      }
    });
  }
  register(
    registerRequest: RegisterRequestModel
  ): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.apiUrl}/register`,
      registerRequest
    );
  }

  adminLogin(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.apiUrl}/login-admin`,
      loginRequest
    );
  }
  adminRegister(
    registerRequest: RegisterRequestModel
  ): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.apiUrl}/register-admin`,
      registerRequest
    );
  }

  setAuthenticated(value: boolean) {
    this.isAuthSubject.next(value);
  }

  get token() {
    return this.localStorage.get('token');
  }

  get isAuthenticated() {
    let token = this.localStorage.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired(token)) return false;
    return true;
  }

  setToken(token: string) {
    this.localStorage.set('token', `Bearer ${token}`);
  }

  getUserId() {
    if (this.token) {
      let decoded = this.jwtHelperService.decodeToken(this.token);
      return decoded[JWTTokenClaim.identifier];
    }
  }

  getUserName() {
    if (this.token) {
      return JSON.parse(window.atob(this.token.split('.')[1]))[JWTTokenClaim.fullname];
    }
  }

  getPreTestStatus() {
    if (!this.isAuthenticated || this.preTestCompleted) return '1';
    return this.jwtHelperService.decodeToken()['TestCompleted'] || '0';
  }
  getPreTestStatusEb() {
    if (!this.isAuthenticated || this.preTestCompleted) return '1';
    return this.jwtHelperService.decodeToken()['TestCompletedEb'] || '0';
  }
  completePreTest(id: number): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.apiUrl}/complete-pre-test?number=${id}`,
      {}
    );
  }
  completePreTestManual() {
    this.preTestCompleted = true;
  }

  resetPassword(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.apiUrl}/reset-password?email=${email}`
    );
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.apiUrl}/change-password`,
      changePasswordDto
    );
  }

  isAuthorized(requiredClaims?: string[]): boolean {
    if (!this.isAuthenticated) return false;
    const tokenUserModel: TokenUserModel | undefined = this.getTokenUserModel();
    if (
      tokenUserModel &&
      requiredClaims &&
      !requiredClaims.some((role) => tokenUserModel.claims.includes(role))
    )
      return false;
    return true;
  }
  getTokenUserModel(): TokenUserModel | undefined {
    const decodedToken = this.jwtHelperService.decodeToken(
      this.jwtHelperService.tokenGetter()
    );
    if (!decodedToken) return;

    const tokenUserModel: TokenUserModel = {
      id: +decodedToken[JWTTokenClaim.identifier],
      name: decodedToken[JWTTokenClaim.fullname],
      email: decodedToken[JWTTokenClaim.email],
      claims: decodedToken[JWTTokenClaim.role]
        ? decodedToken[JWTTokenClaim.role].split(',')
        : [],
    };
    return tokenUserModel;
  }
  logout(): any {
    this.setAuthenticated(false);
    this.localStorage.remove('token');
    this.localStorage.remove('refresh');
  }
}
