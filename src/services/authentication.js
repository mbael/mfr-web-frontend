export default {
  user: {
    authenticated: false,
  },
  login: function login(context, credentials) {
    return new Promise((resolve, reject) => {
      context
        .post('http://localhost:2000/v1/user', credentials)
        .then((response) => {
          const token = response.body.access_token;

          localStorage.setItem('access_token', token);
          this.user.authenticated = true;
          resolve();
        })
        .catch((response) => {
          reject(response.status);
        });
    });
  },
  logout: function logOut() {
    localStorage.removeItem('access_token');

    this.user.authenticated = false;
  },
  checkAuth: function checkAuth() {
    const jwt = localStorage.getItem('access_token');

    if (jwt) {
      this.user.authenticated = true;
      return true;
    }

    this.user.authenticated = false;
    return false;
  },
};
