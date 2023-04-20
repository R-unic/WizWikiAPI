const pm2 = require("pm2");

pm2.connect(function() {
  pm2.start({
    script: "../app/dist/App.js",
    name: "WizWikiAPI"
  }, function(err, apps) {
    if (err) throw err;
    console.log("Process started successfully");
    pm2.disconnect();
  });
});
