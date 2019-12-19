const request = require('request-promise-native');

class API {
  constructor(TOKEN) {
    this.token = TOKEN;
  }

  random(tags, bestMatch = true) {
    return new Promise((resolve, reject) => {
      tags = Array.isArray(tags) ? tags.join(',') : String(tags);
      request({
        uri: 'https://chop-gifs.herokuapp.com/gif/random',
        headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        json: { tags, bestMatch },
      })
        .then(res => {
          resolve(res.url);
        })
        .catch(err => {
          console.error(err.message);
          resolve('https://cdn.chop.coffee/confused/0.gif');
        });
    });
  }
}

module.exports = new API(process.env.GIFS_API_TOKEN);
