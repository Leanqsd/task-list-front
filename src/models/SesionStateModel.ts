import type { AuthModel } from './AuthModels';

export interface SesionStateModel {
  isAuthenticated: boolean;
  user: AuthModel | null;
  loading: boolean; // Agregar esta línea
}
