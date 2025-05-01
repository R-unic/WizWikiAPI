type Maybe<T> = T | undefined;
type NumberRange = [number, number];
type OmitMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};