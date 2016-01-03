Meteor.publish('chats', function () {
  return Chats.find({
    $or: [{
      user1Id: this.userId
    }, {
      user2Id: this.userId
    }]
  });
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({}, {
      fields: {
        profile: 1,
        _id: 1
      }
    });
  }
});