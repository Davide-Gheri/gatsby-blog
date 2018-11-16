import { css } from 'styled-components';

const sizes: {[key: string]: any} = {
  sm: '576',
  md: '768',
  lg: '992',
  xl: '1200',
};

export const media = Object.keys(sizes).reduce((accumulator, label: string) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args: any) => css`
    @media (min-width: ${emSize}em) {
      ${(css as any)(...args)}
    }
  `;
  return accumulator;
}, {} as any) as {sm: any, md: any, lg: any, xl: any};
