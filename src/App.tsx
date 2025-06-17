// routes
import Router from './common/routes';
// theme
import ThemeProvider from './common/theme';
// components
import ThemeSettings from './common/components/settings';
import { ChartStyle } from './common/components/chart';
import ScrollToTop from './common/components/ScrollToTop';
import { ProgressBarStyle } from './common/components/ProgressBar';
import NotistackProvider from './common/components/NotistackProvider';
import MotionLazyContainer from './common/components/animate/MotionLazyContainer';
import { QueryClient, QueryClientProvider } from 'react-query';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <ProgressBarStyle />
              <ChartStyle />
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
