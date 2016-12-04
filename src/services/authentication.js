export default {
  authenticated: false,
  data: false,
  login(context, credentials) {
    return context.$http
      .post('http://mfr.bael.me/v1/user', credentials)
      .then((response) => {
        const token = response.data.accessToken;

        // set authenticated status true
        localStorage.setItem('accessToken', token);

        this.authenticated = true;

        return response;
      });
  },
  loginWithFacebook(context, data) {
    return context.$http
      .post('http://mfr.bael.me/v1/user/facebook', data)
      .then((response) => {
        const token = response.data.accessToken;

        // set authenticated status true
        localStorage.setItem('accessToken', token);

        this.authenticated = true;

        return response;
      });
  },
  logout() {
    localStorage.setItem('accessToken', null);

    this.data = null;
    this.authenticated = false;
  },
  isAuthenticated() {
    const jwt = localStorage.getItem('accessToken');

    // note: https://bugzilla.mozilla.org/show_bug.cgi?id=538142
    if (jwt !== null) {
      this.authenticated = true;
      return true;
    }

    this.authenticated = false;
    return false;
  },
  getToken() {
    return localStorage.getItem('accessToken');
  },
};
