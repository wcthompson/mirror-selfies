const NodeHelper = require('node_helper');
const spawn = require('child_process').spawn;

module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
        
    },

    socketNotificationReceived: function(notification, payload) {
    if (notification === "START_SERVER") {
      this.startServer();
      return;
    }
  },

    startServer : function() {
        this.started = true;
        var self = this;
        const proc = spawn('python', ['modules/command_center/server.py']);
        proc.stderr.on('data', function (err) { console.error('Data: ' + err); });

        // emit the message to other modules
        proc.stdout.on('data', function (data) { 
            console.error('command center stdout: ' + data); 
            self.sendSocketNotification(data, "");
        }); 
    }
  
});
