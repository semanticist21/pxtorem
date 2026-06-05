# @kkoms/pxtorem

`@kkoms/pxtorem` is a typescript library for calculating px value to rem.
rootPx is calculated based on `getComputedStyle(document.documentElement).fontSize`.
Update its value when visibility changes.

## Installation

```shell
bun add @kkoms/pxtorem
# or
yarn add @kkoms/pxtorem
# or
npm install @kkoms/pxtorem --save
# or
pnpm add @kkoms/pxtorem
```

## Example Usage

```typescript
function Example() {
  // when root px is 16.
  const remValue = pxToRem(16);
  const remValueString = pxToRemString(16);

  // result
  console.log(remValue); // 1
  console.log(remValueString); // '1rem'

  const pxValue = remToPx(1);
  const pxValueString = remToPxString(1);

  // result
  console.log(pxValue); // 16
  console.log(pxValueString); // '16px'

  // update base px
  // please invoke this function when your app is using SSR in somewhere like useEffect or window event listener.
  useEffect(() => {
    updateBasePx();
  }, []);

  // by default it adds window event listener to update base px when visibility change.
  // if you want to remove it, you can use removeHandleWindowVisibilityChange.
  removeHandleWindowVisibilityChange();
}
```

## SSR

When browser globals are unavailable, the library falls back to a 16px root size. In
client code, call `updateBasePx()` after mount if your app changes the root font size
during hydration.

## Development

```shell
bun install
bun run test
bun run typecheck
bun run build
```
