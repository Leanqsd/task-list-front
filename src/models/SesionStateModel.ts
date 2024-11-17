import type { AuthModel } from './AuthModels';

export interface SesionStateModel {
  isAuthenticated: boolean;
  user: AuthModel | null;
  jwtExpires: number | undefined;
  csrfToken: string | undefined;
  error: string;
  loading: boolean;
}
