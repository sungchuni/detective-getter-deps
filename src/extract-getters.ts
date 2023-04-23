type Getters<T> = [keyof T, TypedPropertyDescriptor<T[keyof T]>][];

export const extractGetters = <T>(object: T) =>
  Object.entries(Object.getOwnPropertyDescriptors(object)).reduce<Getters<T>>(
    (accumulator, [key, propertyDescriptor]) => {
      propertyDescriptor.get &&
        accumulator.push([key as keyof T, propertyDescriptor]);

      return accumulator;
    },
    []
  );
