import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import { DotsLoaderComponent } from '../../../../shared/components/dots-loader/dots-loader.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, DotsLoaderComponent, RouterLink],
  templateUrl: './login-page.html',
  standalone: true,
  styleUrls: ['./login-page.scss']
})
export class LoginPage {
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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ])
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
      console.warn('Login form is invalid');
    }
  }
}
