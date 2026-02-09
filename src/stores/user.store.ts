import { create } from "zustand";

type User = {
  userId : number;
}

type AuthStore = {
  user: User | null;
  accessToken: string | null
  isAutehnticated: boolean;
  setAuth: (user: User, accessToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAutehnticated: false,
  accessToken: null,
  user: null,
  setAuth:(user, accessToken) =>
    set({ accessToken, user, isAutehnticated: true}),
  clearAuth:() =>
    set({ user: null, isAutehnticated: false, accessToken:null})
}))
