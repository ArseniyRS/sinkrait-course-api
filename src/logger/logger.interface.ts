export interface ILogger{
  logger: unknown
  info: () => void
  error: () => void
  warn: () => void
}