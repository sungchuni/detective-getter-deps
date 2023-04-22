export const extractGetters = <T extends object>(object: T) =>
  Object.entries(Object.getOwnPropertyDescriptors(object)).filter(
    ([, { get }]) => Boolean(get)
  );
