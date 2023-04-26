# detective-getter-deps

Extract the getter dependencies from object.

## Installation

```bash
npm i detective-getter-deps
```

## Usage

```ts
import { detectGetterDeps } from 'detective-getter-deps';

const dependencies = detectGetterDeps({
  firstName: 'jeans',
  lastName: 'new',
  get fullName() {
    return [this.firstName, this.lastName].join(' ');
  },
});

dependencies.get('fullName'); // Set { 'firstName', 'lastName' }
```

## Why?

This is useful when you want to know which properties are used in the getter.

## Disclaimer

If there are conditional evaluation rules within the getter body, it may not work properly because there could be properties that are not accessed depending on the object state conditions.

```ts
import { detectGetterDeps } from 'detective-getter-deps';

const dependencies = detectGetterDeps({
  realName: 'deno',
  alias: 'saurus',
  get name() {
    return this.alias || this.realName;
  },
});

dependencies.get('name'); // Set { 'alias' }, not Set { 'alias', 'realName' }
```
