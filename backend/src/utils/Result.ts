export class Result<T> {
  private readonly _value: T;
  private readonly _isSuccess: boolean;
  private readonly _statusCode: number;
  private readonly message: string;
  private readonly validationErrors: Record<string, string[]>;

  private constructor(
    value?: T,
    isSuccess?: boolean,
    message?: string,
    statusCode?: number,
    errors?: Record<string, string[]>,
  ) {
    this._value = value as T;
    this._isSuccess = isSuccess as boolean;
    this._statusCode = statusCode as number;
    this.message = message as string;
    this.validationErrors = errors as Record<string, string[]>;
  }

  public static ok<U>(value: U, message: string) {
    return new Result<U>(value, true, message);
  }

  public static fail<U>(
    message: string,
    statusCode: number,
    errors: Record<string, string[]>,
  ) {
    return new Result<U>(undefined, false, message, statusCode, errors);
  }

  public static failWithStatusCode<U>(message: string, statusCode: number) {
    return new Result<U>(undefined, false, message, statusCode);
  }

  public static failWithMessage<U>(message: string) {
    return new Result<U>(undefined, false, message);
  }

  get value() {
    return this._value;
  }

  get isSuccess() {
    return this._isSuccess;
  }

  get statusCode() {
    return this._statusCode;
  }

  toJSON() {
    return {
      isSuccess: this._isSuccess,
      message: this.message,
      value: this._value,
      validationErrors: this.validationErrors,
    };
  }
}
