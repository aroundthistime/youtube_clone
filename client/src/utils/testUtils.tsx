import React, {PropsWithChildren} from 'react';
import {render as rtlRender} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {MemoryRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider, setLogger} from 'react-query';
import rootReducer from '../@modules/root';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity, // prevent "Jest did not exit one second after the test run completed" error message
    },
  },
});

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {}, // prevent network error logging
});

function render(
  ui: React.ReactElement,
  {route = '/', preloadedState = {}, ...renderOptions} = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export const testState = {
  user: {
    _id: '123',
    name: '콘요맘떼',
    email: 'email@naver.com',
    status: '',
    avatarUrl:
      'data:image/jpeg;base64,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',
  },
};

// re-export everything
export * from '@testing-library/react';
// override render method
export {render};
