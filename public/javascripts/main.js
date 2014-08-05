$(function() {
  var btns = $('.btn');
  var $score = $('.score');

  var socket = io.connect('http://localhost:3000');

  initialize();

  function initializeBtnAction () {
    for (var i = 0; i < btns.length; i++) {
      $(btns[i]).on('click', function() {
        socket.emit('good', $(this).data('id'));
      });
    }
  }
  function initialize () {
    initializeBtnAction();
  }

  function updateScoreView(data) {
    var points = [];
    var playerIdToName = data.name;
    var playerIdToPoint = data.point;
    _.each(playerIdToPoint, function(val, key, list) {
      points.push({id: key, point: val});
    });
    var sorted = _.sortBy(points, function(item) {
      return - item.point;
    });
    $score.empty();
    var i = 0;
    _.each(sorted, function(item) {
      $('<li><span class="each-point">' + item["point"] + '</span>' + playerIdToName[item["id"]] + '</li>').appendTo($score).hide().fadeIn(1000 + i);
      i += 500;
    });
  }
  socket.on('login', function(data) {
    updateScoreView(data);
  });
  socket.on('update status', function(data) {
    updateScoreView(data);
  });
});
