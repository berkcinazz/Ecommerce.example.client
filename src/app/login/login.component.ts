import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Router } from '@angular/router';
import { EncryptionService } from '../core/services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private encryptionService: EncryptionService
  ) {}
  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe((response:any) => {
      var encrypted = this.encryptionService.set(
        '123456$#@$^@1ERF',
        JSON.stringify(this.loginForm.value)
      );
      this.localStorageService.set('refresh', encrypted);
      console.log(response);
      this.authService.setToken(response.accessToken.token);
      if (response.accessToken.token) {
        this.authService.setAuthenticated(true);
        this.router.navigateByUrl('/');
      }
    });
  }
}
