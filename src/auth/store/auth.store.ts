import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/loginAction';
import { checkAuthAction } from '../actions/checkAuth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    isAdmin: () => boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    isAdmin: () => {
        const roles = get().user?.roles ?? [];
        return roles.includes('admin');
    },

    login: async (email: string, password: string) => {
        console.log(email, password)
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;

        } catch (error) {
            console.log(error)
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token')
            return false;
        }

    },
    logout: () => {
        set({ user: null, token: null, authStatus: 'not-authenticated' });
        localStorage.removeItem('token');
    },
    checkAuthStatus: async () => {
        try {

            const { user, token } = await checkAuthAction();
            set({ user, token, authStatus: 'authenticated' })
            return true;

        } catch (error) {
            console.log(error)
            set({ user: null, token: null, authStatus: 'not-authenticated' });
        }
        return false;
    }
}))
