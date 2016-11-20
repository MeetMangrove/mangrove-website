window.FriendsSection = function(opts) {
  this.friends = opts.elements;
  this.amountToShow = opts.amountToShow || 20;
  this.timeout = opts.timeout || 5000;
  this.friendsDiv = $(opts.wrapper || '#friends');
  this.activeFriends = [];

  this.generateFriendDiv = function(f) {
    var html = '<div data-twitter='+f.twitter+'><a href="http://twitter.com/'+f.twitter+'" target="_blank">';
    html += '<div class="member-profile" style="background-image: url('+f.image+')"></div>';
    html += '<div class="member-name">'+f.first_name+' '+f.last_name+'</div></div>';

    return html;
  };

  this.getNewFriend = function() {
    var duplicate = true;

    while (duplicate) {
      var idx = Math.floor(Math.random() * this.friends.length);
      var newFriend = this.friends[idx];

      if (this.activeFriends.indexOf(newFriend) < 0) {
        duplicate = false;
      }
    }

    return newFriend;
  }.bind(this);

  this.getRandomFriends = function() {
    var randomFriends = [];
    while (randomFriends.length < this.amountToShow) {
      var idx = Math.floor(Math.random() * this.friends.length);
      var friend = this.friends[idx];
      if (randomFriends.indexOf(friend) < 0) {
        randomFriends.push(friend);
      }
    }

    this.activeFriends = randomFriends;
    return randomFriends;
  }.bind(this);

  this.removeFriendFromActiveList = function(twitter) {
    for (var i = 0; i < this.activeFriends.length; i++) {
      if (this.activeFriends[i].twitter === twitter) {
        this.activeFriends.splice(i, 1);
        return;
      }
    }
  }

  this.swapFriend = function() {
    var idx = Math.floor(Math.random() * this.amountToShow);
    var oldFriend = this.friendsDiv.children().get(idx);
    this.removeFriendFromActiveList(
      $(oldFriend).children("div").data("twitter")
    );

    var newFriend = this.getNewFriend();
    var newFriendDiv = this.generateFriendDiv(newFriend);
    this.activeFriends.push(newFriend);

    $(oldFriend).fadeOut('slow', function() {
      $(this).html(newFriendDiv);
    }).fadeIn(1000);
  }.bind(this);

  this.init = function() {
    var randomFriends = this.getRandomFriends();

    for (var i = 0; i < randomFriends.length; i++) {
      this.friendsDiv.append(
        '<li>'+this.generateFriendDiv(randomFriends[i])+'</li>'
      );
    }

    window.setInterval(function() {
      this.swapFriend()
    }.bind(this), this.timeout);
  };
};
