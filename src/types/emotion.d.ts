import '@emotion/react';
import type theme from '../styles/theme';

type ColorKeys = keyof (typeof theme)['colors'];

declare module '@emotion/react' {
  export interface Theme {
    colors: { [K in ColorKeys]: (typeof theme)['colors'][K] };
  }
}
