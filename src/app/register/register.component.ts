import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { RegisterRequestModel } from '../core/models/registerRequestModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptionService } from '../core/services/encryption.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      passwordVerify: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  get f() {
    return this.registerForm.controls;
  }
  register() {
    this.authService.register(this.registerForm.value).subscribe((response) => {
      var encrypted = this.encryptionService.set(
        '123456$#@$^@1ERF',
        JSON.stringify({
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('email')?.value,
        })
      );
      this.localStorageService.set('refresh', encrypted);
      this.authService.setToken(response.token);
      if (response.token) {
        this.authService.setAuthenticated(true);
        this.router.navigateByUrl('/');
      }
    });
  }
}
