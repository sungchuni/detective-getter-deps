import { extractGetters } from '../src/extract-getters';

describe('extractGetters', () => {
  it('should return an array of getters', () => {
    const object = {
      a: 1,
      get b() {
        return this.a;
      },
      get c() {
        return this.a + this.b;
      },
    };

    const getters = extractGetters(object);

    expect(getters).toStrictEqual([
      ['b', Object.getOwnPropertyDescriptor(object, 'b')],
      ['c', Object.getOwnPropertyDescriptor(object, 'c')],
    ]);
  });

  it('should return an empty array if no getters', () => {
    const getters = extractGetters({
      a: 1,
      b: 2,
    });

    expect(getters).toStrictEqual([]);
  });
});
