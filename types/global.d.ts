type Maybe<T> = T | undefined;
type NumberRange = [number, number];
type OmitMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};
type NumberTypeRange<N extends number, A extends any[] = []> =
  A['length'] extends N ? A[number] : Range<N, [...A, A['length']]>;