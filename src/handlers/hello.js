'use strict';
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
require("dotenv").config();

module.exports.sayHello = async function(context, req) {
  context.log('JavaScript HTTP trigger function v9 processed a request.');
  const account = "slseus**";
  const accountKey = "WzpZi**";
  context.log(`account=${account}, accountKey=${accountKey}`);
  if (req.query.name || (req.body && req.body.name)) {
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    context.log("Passed stage 1");
    const queueServiceClient = new QueueServiceClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${account}.queue.core.windows.net`,
      sharedKeyCredential
    );
    context.log(`List queues`);
    let i = 1;
    for await (const item of queueServiceClient.listQueues()) {
      context.log(`Queue ${i++}: ${item.name}`);
    }

    // Create a new queue
    const queueName = `myqueue`;
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const createQueueResponse = await queueClient.create();
    context.log(
      `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
    );

    // Send a message into the queue using the sendMessage method.
    var httpInput = req.query.name || req.body.name;
    const enqueueQueueResponse = await queueClient.sendMessage(httpInput);
    console.log(
      `Sent message successfully, service assigned message Id: ${enqueueQueueResponse.messageId}, service assigned request Id: ${enqueueQueueResponse.requestId}`
    );
    context.log("Passed stage 2");
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: `Hello v9 ${httpInput}, queueMsgId=${enqueueQueueResponse.messageId}`,
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    };
  }
};