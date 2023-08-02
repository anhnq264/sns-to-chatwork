const Chatwork = require('./chatwork/core');
const {BodyMessage} = require('./chatwork/entity');
require('dotenv').config()

module.exports.handler = async (event) => {
  const roomID = process.env.ROOMID || ""
  const chatwork = new Chatwork({
    token: process.env.CHATWORK_TOKEN || "",
  });
  const messages = event.Records;
  const promises = []
  for (let i = 0; i < messages.length; i++) {
    let messageSendChatwork = structuredClone(BodyMessage);
    // set Title
    messageSendChatwork = messageSendChatwork.replace(/\{#title\}/g, messages[i].Sns.Subject);
    // set Body
    let messageSns = "";
    for(const [key, value] of Object.entries(JSON.parse(messages[i].Sns.Message))) {
        if (typeof(value) === 'object') {
          messageSns += `${key} : ${JSON.stringify(value)}\n`
        } else {
          messageSns += `${key} : ${value}\n`
        }
    }
    messageSendChatwork = messageSendChatwork.replace(/\{#body\}/g, messageSns);
    // send API
    promises.push(chatwork.sendMessage(roomID, messageSendChatwork));
  }
  const result = await Promise.all(promises);
  const response = {
    statusCode: 200,
    body: JSON.stringify("SNS to lambda"),
  };
  return response;
};
