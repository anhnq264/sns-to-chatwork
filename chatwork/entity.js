module.exports.Message = {
    messageID: "", // a string representing the ID of the message
    body: "", // a string representing the content of the message (optional)
    account: {}, // an object representing the account related to the message (optional)
    sendTime: 0, // an integer representing the time the message was sent (optional)
    updateTime: 0, // an integer representing the time the message was updated (optional)
};

module.exports.BodyMessage = `
[toall]
[info]
[title]{#title}[/title]
[code]{#body}[/code]
[/info]`;