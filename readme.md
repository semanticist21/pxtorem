# @kkoms/pxtorem

`@kkoms/pxtorem` is a typescript library for calculating px value to rem.
rootPx is calculated based on `getComputedStyle(document.documentElement).fontsize`.
Update its value when visibility changes(only in csr).

## Installation

```shell
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
  // please invoke this function when your app is using SSR in somewhere useEffect.
  // it is to support font size change by visibility(as the user leaves its current tab).
  useEffect(() => {
    updateBasePx();
  }, []);

  // by default it adds window event listener to update base px when visibility change.
  // if you want to remove it, you can use removeHandleWindowVisibilityChange.
  removeHandleWindowVisibilityChange();
}
```
