export default {
  get(context) {
    return context.$http.get('http://mfr.bael.me/v1/users');
  },
  getById(context, userId) {
    return context.$http.get('http://mfr.bael.me/v1/users/{userId}', {
      params: {
        userId,
      },
    });
  },
  create(context, data) {
    return context.$http.post('http://mfr.bael.me/v1/users', data);
  },
};
