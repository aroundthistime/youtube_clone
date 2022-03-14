export type OptionalPick<T, K extends PropertyKey> = Pick<
  T,
  Extract<keyof T, K>
>;

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
  U[keyof U];
