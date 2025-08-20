import { css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  textarea,
  label,
  table {
    font-family:
      'SUIT Variable',
      SUIT,
      -apple-system;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
  }
  body {
    margin: 0;
    line-height: 1;
    background: #fff;
  }
  ol,
  ul {
    list-style: none;
  }
  button {
    font-family:
      'SUIT Variable',
      SUIT,
      -apple-system;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  input {
    font-family:
      'SUIT Variable',
      SUIT,
      -apple-system;
  }
`;

export default globalStyles;
