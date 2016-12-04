export default {
  get(context) {
    return context.$http.get('http://mfr.bael.me/v1/runs');
  },
  getById(context, runId) {
    return context.$http.get('http://mfr.bael.me/v1/runs/{runId}', {
      params: {
        runId,
      },
    });
  },
  getResults(context, runId) {
    return context.$http.get('http://mfr.bael.me/v1/runs/{runId}/results', {
      params: {
        runId,
      },
    });
  },
  getRunnersById(context, runId) {
    return context.$http.get('http://mfr.bael.me/v1/runs/{runId}/runners', {}, {
      params: {
        runId,
      },
    });
  },
  addRunner(context, runId) {
    return context.$http.post('http://mfr.bael.me/v1/runs/{runId}/runners', {}, {
      params: {
        runId,
      },
    });
  },
};
