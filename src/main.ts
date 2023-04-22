import { extractGetters } from './extract-getters';

export const inspectGetterDeps = <T extends Record<string, unknown>>(
  object: T
): Map<keyof T, Set<keyof T>> => {
  const dependencies: Map<keyof T, Set<keyof T>> = new Map();

  for (const [key, propertyDescriptor] of extractGetters(object))
    propertyDescriptor.get?.call(
      new Proxy(object, {
        get(target, property, receiver) {
          property in target &&
            typeof property === 'string' &&
            dependencies.set(
              key,
              (dependencies.get(key) || new Set()).add(property)
            );

          return Reflect.get(target, property, receiver);
        },
      })
    );

  return dependencies;
};
