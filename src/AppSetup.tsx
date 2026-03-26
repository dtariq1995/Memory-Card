import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

const queryClient = new QueryClient();

function AppSetup() {
    return (
        <StrictMode>
            <ErrorBoundary fallback={<p>An error has occurred.</p>}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}

export default AppSetup;