//custom.d.ts

declare module 'react-windy-ui' {
  interface Button {
    color?: string;
    onClick?: Function;
    children?: React.ReactNode;
  }
  export { Button };
}
