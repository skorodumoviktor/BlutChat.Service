export interface LoggerInterface {
  info(params: unknown): void
  error(params: unknown): void
  debug(params: unknown): void
}
