'use strict';

module.exports.printMessage = function(context, myQueueItem) {
  context.log('Received item: ${myQueueItem}');
  context.done();
};