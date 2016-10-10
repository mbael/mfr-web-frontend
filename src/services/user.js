export default {
  getData: function getData(context) {
    return new Promise((resolve, reject) => {
      context
        .get('http://localhost:2000/v1/user')
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
