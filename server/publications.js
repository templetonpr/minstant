Meteor.publish('chats', function () {
  return Chats.find();
});

Meteor.publish('userData', function () {
  return Meteor.users.find();
});