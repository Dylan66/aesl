// Authentication utility functions
export const fakeAuthAPI = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(credentials.email.endsWith('@aesl.com') && credentials.password.length >= 6) {
          resolve({
            token: 'fake-jwt-token',
            role: credentials.email.startsWith('admin') ? 'admin' : 'staff'
          })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  },
  
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 201, message: 'User created successfully' })
      }, 500)
    })
  }
}

// LocalStorage helpers
export const storeToken = (token) => {
  localStorage.setItem('aesl-auth-token', token)
}

export const getToken = () => {
  return localStorage.getItem('aesl-auth-token')
}

export const isAuthenticated = () => {
  return !!getToken()
}

// Add this new function to get role from token
export const getCurrentRole = () => {
  const token = getToken()
  return token?.includes('admin') ? 'admin' : 'staff'
}