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
  followRace(context, raceId) {
    return context.$http.post('http://127.0.0.1:2000/v1/user/follow', {
      raceId,
    });
  },
  unfollowRace(context, raceId) {
    return context.$http.delete('http://127.0.0.1:2000/v1/user/follow', {
      body: {
        raceId,
      },
    });
  },
};
