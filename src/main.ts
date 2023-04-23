import { extractGetters } from './extract-getters';

export const detectGetterDeps = <T extends object>(
  object: T
): Map<keyof T, Set<keyof T>> => {
  const dependencies: Map<keyof T, Set<keyof T>> = new Map();

  const isPropertyInTarget = <T extends object>(
    property: string | number | symbol,
    target: T
  ): property is keyof T => property in target;

  for (const [key, propertyDescriptor] of extractGetters(object)) {
    propertyDescriptor.get?.call(
      new Proxy(object, {
        get(target, property, receiver) {
          isPropertyInTarget(property, target) &&
            dependencies.set(
              key,
              (dependencies.get(key) || new Set()).add(property)
            );

          return Reflect.get(target, property, receiver);
        },
      })
    );
  }

  return dependencies;
};
