const Axios = require('axios')
const CHATWORK_API = "https://api.chatwork.com";
module.exports =  class Chatwork {
  constructor(opt) {
    this.token = opt.token;
    this.http = Axios.create({
      baseURL: CHATWORK_API,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-ChatWorkToken': this.token
      }
    });
  }

  async sendMessage(roomID, message) {
    const api = `/v2/rooms/${roomID}/messages`;
    const response = await this.http.post(api, `body=${message}`);
    return response.data;
  }
}