import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import { DotsLoaderComponent } from '../../../../shared/components/dots-loader/dots-loader.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, DotsLoaderComponent, RouterLink],
  templateUrl: './register-page.component.html',
  standalone: true,
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
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

  onSubmit() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      this.store.dispatch(AuthActions.register({ request: { email, password, confirmPassword } }));

      this.loading$.subscribe(loading => {
        if (!loading) {
          this.loading$

          this.router.navigate(['/auth/login']);
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
      console.warn('Login form is invalid');
    }
  }
}
