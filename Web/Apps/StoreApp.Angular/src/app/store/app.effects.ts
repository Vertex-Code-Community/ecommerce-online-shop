import { Injectable } from '@angular/core';
import { AuthEffects } from './auth/auth.effects';

@Injectable()
export class AppEffects {
  constructor(
    public authEffects: AuthEffects,
  ) {}
}
