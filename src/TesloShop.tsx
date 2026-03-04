import React from 'react'
import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { type PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from './components/custom/CustomFullscreenLoading';
import { useAuthStore } from './auth/store/auth.store';



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
