Meteor.methods({
  sendMessage: function (chatId, text) {

    if (this.userId) {

      var chat = Chats.findOne({
        _id: chatId
      });

      if (chat) { // ok - we have a chat to use
        var msgs = chat.messages; // pull the messages property
        if (!msgs) { // no messages yet, create a new array
          msgs = [];
        }

        msgs.push({
          timeStamp: new Date().toUTCString(),
          sentBy: this.userId,
          text: text
        });

        chat.messages = msgs; // put the messages array onto the chat object
        Chats.update(chat._id, chat); // update the chat object in the database.
        return "chat updated " + new Date().toISOString();
      }
    }
  },

  getChat: function (otherUserId) {
    // find a chat that has two users that match current user id and the requested user id
    var chatId;
    var filter = {
      $or: [
        {
          user1Id: this.userId,
          user2Id: otherUserId
        },
        {
          user2Id: this.userId,
          user1Id: otherUserId
        }
      ]
    };

    var chat = Chats.findOne(filter);
    if (!chat) { // no chat matching the filter - need to insert a new one
      chatId = Chats.insert({
        user1Id: this.userId,
        user2Id: otherUserId
      });
    } else { // there is a chat going already - use that. 
      chatId = chat._id;
    }

    return chatId;
  }
});