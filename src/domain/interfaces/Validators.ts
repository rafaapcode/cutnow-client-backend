export interface IValidator<T> {
  validate(body: T): {error: boolean; message?: string};
}