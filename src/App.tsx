import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import theme from './styles/theme';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './styles/globalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
