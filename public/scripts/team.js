window.FriendsSection = function(opts) {
  this.friends = opts.elements;
  this.amountToShow = opts.amountToShow || 20;
  this.timeout = opts.timeout || 5000;
  this.friendsDiv = $(opts.wrapper || '#friends');

  this.randomizeArray = function(a) {
    var j, x, i;
    for (var i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  };

  this.generateFriendDiv = function(f) {
    var html = '<div data-twitter='+f.twitter+'><a href="http://twitter.com/'+f.twitter+'" target="_blank">';
    html += '<div class="member-profile" style="background-image: url('+f.image+')"></div>';
    html += '<div class="member-name">'+f.first_name+' '+f.last_name+'</div></div>';

    return html;
  };

  this.swapFriend = function(idx) {
    var idxToRemove = Math.floor(Math.random() * this.amountToShow);
    var oldFriend = this.friendsDiv.children().get(idxToRemove);

    var newFriend = this.friends[idx];
    var newFriendDiv = this.generateFriendDiv(newFriend);

    $(oldFriend).fadeOut('slow', function() {
      $(this).html(newFriendDiv);
    }).fadeIn(1000);
  }.bind(this);

  this.init = function() {
    this.randomizeArray(this.friends);

    var firstFriends = this.friends.slice(0, this.amountToShow);
    var nextFriendIndex = this.amountToShow;

    for (var i = 0; i < firstFriends.length; i++) {
      this.friendsDiv.append(
        '<li>'+this.generateFriendDiv(this.friends[i])+'</li>'
      );
    }

    console.log('max:', this.friends.length);
    window.setInterval(function() {
      this.swapFriend(nextFriendIndex);
      nextFriendIndex = ++nextFriendIndex % this.friends.length;
      console.log(nextFriendIndex);
    }.bind(this), this.timeout);
  };
};
