export interface AppError {
  status: number;
  message: string;
  raw?: unknown;
}
