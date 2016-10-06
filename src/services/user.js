export default {
  getData: function getData(context) {
    return new Promise((resolve, reject) => {
      context
        .get('http://localhost:2000/v1/user', {
          before: (req) => {
            console.log(req);
          },
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
