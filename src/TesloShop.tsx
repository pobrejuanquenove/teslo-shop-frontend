import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type PropsWithChildren } from 'react';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { appRouter } from './app.router';
import { useAuthStore } from './auth/store/auth.store';
import { CustomFullScreenLoading } from './components/custom/CustomFullscreenLoading';



const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthStore()

    const { isLoading } = useQuery({
        queryKey: ['Auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5

    })

    if (isLoading) {
        return (<CustomFullScreenLoading />)
    }
    return (children)
}

const queryClient = new QueryClient();

export const TesloShop = () => {



    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
