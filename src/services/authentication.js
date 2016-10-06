export default {
  authenticated: false,
  data: false,
  login: function login(context, credentials) {
    return new Promise((resolve, reject) => {
      context
        .post('http://localhost:2000/v1/user', credentials)
        .then((response) => {
          const token = response.body.access_token;

          /* set authenticated status true */
          localStorage.setItem('access_token', token);
          this.authenticated = true;

          resolve();
        })
        .catch((response) => {
          reject(response.status);
        });
    });
  },
  logout: function logOut() {
    localStorage.removeItem('access_token');

    this.authenticated = false;
  },
  checkState: function checkState() {
    const jwt = localStorage.getItem('access_token');

    if (jwt) {
      this.authenticated = true;
      return true;
    }

    this.authenticated = false;
    return false;
  },
};
