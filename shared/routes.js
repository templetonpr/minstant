Router.configure({ // set up main template router will use to build pages
  layoutTemplate: 'ApplicationLayout'
});


Router.route('/', function () { // specify top level route, the page users see when arriving at site
  //console.log("rendering root /");
  var route = this;

  route.render("navbar", {
    to: "header"
  });

  if (Meteor.user()) {
    route.render("lobby_page", {
      to: "main"
    });
  } else {
    route.render("landing_page", {
      to: "main"
    });
  }
});

Router.route('/chat/:_id', function () { // specify route that allows current user to chat with another user
  var route = this;
  /*    
  // the user they want to chat to has id equal to 
  // the id sent in after /chat/... 
  var otherUserId = this.params._id;

  // find a chat that has two users that match current user id
  // and the requested user id
  var filter = {
    $or: [
      {
        user1Id: Meteor.userId(),
        user2Id: otherUserId
      },
      {
        user2Id: Meteor.userId(),
        user1Id: otherUserId
      }
    ]
  };

  var chat = Chats.findOne(filter);
  if (!chat) { // no chat matching the filter - need to insert a new one
    chatId = Chats.insert({
      user1Id: Meteor.userId(),
      user2Id: otherUserId
    });
  } else { // there is a chat going already - use that. 
    chatId = chat._id;
  }
  */

  route.render("navbar", {
    to: "header"
  });

  route.render("loading", {
    to: "main"
  });

  Session.set('chatId', ""); // clear chatId

  Meteor.call('getChat', this.params._id, function (err, res) {
    if (err) { // error
      console.log("getChat error...");
    } else {
      Session.set("chatId", res);
      route.render("chat_page", {
        to: "main"
      });
    }
  });
});

Router.route('/about/', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("about", {
    to: "main"
  });
});