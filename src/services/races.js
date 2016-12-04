export default {
  get(context) {
    return context.$http.get('http://mfr.bael.me/v1/races');
  },
  getById(context, raceId) {
    return context.$http.get('http://mfr.bael.me/v1/races/{raceId}', {
      params: {
        raceId,
      },
    });
  },
  getRuns(context, raceId) {
    return context.$http.get('http://mfr.bael.me/v1/races/{raceId}/runs', {
      params: {
        raceId,
      },
    });
  },
};
