export default {
  getProfile: function checkUser(context) {
    return new Promise((resolve, reject) => {
      context
        .get('http://localhost:2000/api/v1/user')
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  login: function login(context) {
    return new Promise((resolve, reject) => {
      context
        .post('http://localhost:2000/api/v1/user')
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
