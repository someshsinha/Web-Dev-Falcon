/*
Basic idea of a event driven architecture
*/

// Event-driven architecture is a software architecture pattern where the flow of the program is determined by events.
// Events are signals that something has happened, and they trigger the execution of specific code.
// This pattern promotes loose coupling between components, as each component only needs to know about the events it cares about,
// and not about the details of other components.
//adding all of the required things
const os = require("os");
const fs = require("fs");
const Event = require("events");
class Logger extends Event {
  log(message) {
    this.emit(`message emmited`, message);
  }
}
//now logger is the class that extends Event
const logger = new Logger();
logger.on(`message emmited`, (data) => {
  fs.appendFile("logdata.txt", data, (err) => {
    if (err) console.log("Could not updata the file");
  });
});
function logdata() {
  const availablemem = 100 - (os.freemem / os.totalmem) * 100;
  logger.log(`Current memory use: ${availablemem} \n`);
}
setInterval(logdata, 3000);
