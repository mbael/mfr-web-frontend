export default {
  get(context) {
    return context.$http.get('http://mfr.bael.me/v1/user');
  },
  edit(context, data) {
    return context.$http.patch('http://mfr.bael.me/v1/user', data);
  },
  resetPassword(context, data) {
    return context.$http.post('http://mfr.bael.me/v1/user/reset_password', data);
  },
  recoverPassword(context, data) {
    return context.$http.post('http://mfr.bael.me/v1/user/recover_password', data);
  },
  uploadAvatar(context, data) {
    return context.$http.post('http://mfr.bael.me/v1/user/avatar', data);
  },
};
