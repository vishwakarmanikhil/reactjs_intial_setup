import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

// Async thunk for user login
const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await userService.login(credentials)
  return response.data // Assuming the response contains both user data and token
})

// Async thunk for updating a user
const updateUser = createAsyncThunk('user/update', async ({ userData, token }) => {
    const response = await userService.updateUser(userData, token)
    return response.data
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer logic for login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Reducer logic for update
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export { loginUser, updateUser }
export const selectUser = (state) => state.user.user
export const selectToken = (state) => state.user.token
export default userSlice.reducer
