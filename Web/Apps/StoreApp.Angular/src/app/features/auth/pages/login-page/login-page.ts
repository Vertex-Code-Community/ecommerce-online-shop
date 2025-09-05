import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import { DotsLoaderComponent } from '../../../../shared/components/dots-loader/dots-loader.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, DotsLoaderComponent],
  templateUrl: './login-page.html',
  standalone: true,
  styleUrls: ['./login-page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoginMode = true;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ])
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }


  onSubmit() {
    if (this.isLoginMode) {
      this.onLoginSubmit();
    } else {
      this.onRegisterSubmit();
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.store.dispatch(AuthActions.login({ request: { email, password } }));

      this.store.select(AuthSelectors.selectIsAuthenticated).subscribe(isAuth => {
        if (isAuth) {
          this.router.navigate(['/products']);
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
      console.warn('Login form is invalid');
    }
  }

  onRegisterSubmit() {
    // Check password match
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      console.log('Registration data:', { firstName, lastName, email, password });

      alert('Registration successful! Please login with your credentials.');
      this.toggleMode();

    } else {
      this.registerForm.markAllAsTouched();
      console.warn('Register form is invalid');
    }
  }
}
