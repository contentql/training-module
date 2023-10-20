'use client';

import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
export const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
