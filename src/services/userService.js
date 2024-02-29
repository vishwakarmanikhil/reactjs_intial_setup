import api from '../utils/apiUtils';

const userService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials)
      return response;
    } catch (error) {
      // Handle login failure (e.g., incorrect credentials, network error)
      throw new Error('Login failed')
    }
  },
  updateUser: async (userData) => {
    try {
      const response = await api.post(`/api/update/user`, userData)
      return response
    } catch (error) {

      // Handle login failure (e.g., incorrect credentials, network error)
      throw new Error('Update issue')
    }
  },
}

export default userService
