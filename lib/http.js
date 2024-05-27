const axios = require("axios");

module.exports = async (url, method, headers, data, responseType) => {
  const response = await axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
    responseType: responseType,
  });

  return response.data;
};
