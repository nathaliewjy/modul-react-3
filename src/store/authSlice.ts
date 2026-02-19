import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type UserInfo } from "../types"

// 
export type AuthState = {
  userInfo?: UserInfo
  isLoading: boolean
}

// state waktu programnya jalan pertama kali, belum login
const initialState: AuthState = {
  userInfo: undefined,
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.userInfo = action.payload // data dari userData tadi masuk ke sini
      state.isLoading = false
    }
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer