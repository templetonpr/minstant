Meteor.subscribe('chats', function(){
  return Chats.find().fetch();
});

Meteor.subscribe('userData', function(){
  return Meteor.users.find().fetch();
});

  ///
  // helper functions
  ///

  Template.available_user_list.helpers({
    users: function () {
      return Meteor.users.find();
    }
  });

  Template.available_user.helpers({
    getUsername: function (userId) {
      user = Meteor.users.findOne({
        _id: userId
      });
      return user.profile.username;
    },

    isMyUser: function (userId) {
      if (userId == Meteor.userId()) {
        return true;
      } else {
        return false;
      }
    }

  });

  Template.chat_page.helpers({

    messages: function () {
      var chat = Chats.findOne({
        _id: Session.get("chatId")
      });
      return chat.messages;
    },

    other_user_name: function () {

      var chat = Chats.findOne({
        _id: Session.get("chatId")
      });

      if (chat.user1Id != Meteor.userId()){
        var otherUser = chat.user1Id;
      } else {
        var otherUser = chat.user2Id;
      }
      
      return Meteor.users.findOne({_id: otherUser}).profile.username;
    },
    
    other_user_avatar: function () {

      var chat = Chats.findOne({
        _id: Session.get("chatId")
      });

      if (chat.user1Id != Meteor.userId()){
        var otherUser = chat.user1Id;
      } else {
        var otherUser = chat.user2Id;
      }
      
      return Meteor.users.findOne({_id: otherUser}).profile.avatar;
    }

  });

  Template.chat_message.helpers({

    getUserById: function (sentBy) {
      return Meteor.users.findOne({
        _id: sentBy
      }).profile.username;
    },

    messageBackgroundClass: function (sentBy) {
      if (sentBy == Meteor.userId()) {
        return "bg-success";
      } else {
        return "bg-info";
      }
    }

  });

  Template.chat_page.events({

    'submit .js-send-chat': function (event) { // this event fires when the user sends a message on the chat page
      event.preventDefault(); // stop the form from triggering a page reload
      /*
      var chat = Chats.findOne({ // see if we can find a chat object in the database to which we'll add the message
        _id: Session.get("chatId")
      });

      if (chat) { // ok - we have a chat to use
        var msgs = chat.messages; // pull the messages property
        if (!msgs) { // no messages yet, create a new array
          msgs = [];
        }

        // is a good idea to insert data straight from the form
        // (i.e. the user) into the database?? certainly not. 
        // push adds the message to the end of the array

        msgs.push({
          timeStamp: new Date().toUTCString(),
          sentBy: Meteor.user()._id,
          text: event.target.chat.value
        });

        event.target.chat.value = ""; // reset the form
        chat.messages = msgs; // put the messages array onto the chat object
        Chats.update(chat._id, chat); // update the chat object in the database.
      }
      */
      Meteor.call('sendMessage', Session.get("chatId"), event.target.chat.value);
      event.target.chat.value = ""; // reset the form
    }

  });