import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  showPassword = false;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
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
      console.warn('Form is invalid');
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
