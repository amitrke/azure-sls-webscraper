'use strict';

module.exports.printMessage = function(context, myqueue) {
  context.log(`Received item: ${myqueue}`);
  context.done();
};