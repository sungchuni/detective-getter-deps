import { detectGetterDeps } from '../src/main';

describe('detectGetterDeps', () => {
  it('should return a map of dependencies', () => {
    const dependencies = detectGetterDeps({
      a: 1,
      get b(): number {
        return this.a;
      },
      get c() {
        return this.a + this.b;
      },
    });

    expect(dependencies).toStrictEqual(
      new Map([
        ['b', new Set(['a'])],
        ['c', new Set(['a', 'b'])],
      ])
    );
  });

  it('should return empty map if no getters', () => {
    const dependencies = detectGetterDeps({
      a: 1,
      b: 2,
    });

    expect(dependencies).toStrictEqual(new Map());
  });

  it('may not work properly with nested getters', () => {
    const dependencies = detectGetterDeps({
      a: 1,
      b: 2,
      get c() {
        return this.a ? this.a : this.b;
      },
    });

    expect(dependencies).toStrictEqual(new Map([['c', new Set(['a'])]]));
  });
});
