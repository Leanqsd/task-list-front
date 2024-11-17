import type { AuthModel } from './AuthModels';

export interface SesionStateModel {
  isAuthenticated: boolean;
  user: AuthModel | null;
  jwtExpires: number | undefined;
  crsfToken: string | undefined;
  error: string;
  loading: boolean; // Agregar esta línea
}
