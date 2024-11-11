{"filter":false,"title":"app.mjs","tooltip":"/serverless-tasks-webapp/sam/src/handlers/detectLabels/app.mjs","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":1,"column":0},"end":{"row":90,"column":2},"action":"insert","lines":["import { DynamoDBClient } from '@aws-sdk/client-dynamodb';","import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';","import { RekognitionClient, DetectLabelsCommand } from '@aws-sdk/client-rekognition';","","const ddbClient = new DynamoDBClient();","const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);","const rekognitionClient = new RekognitionClient();","const tableName = process.env.TASKS_TABLE;","","export const handler = async (event) => {","  console.info(JSON.stringify(event, null, 2));","","  const bucket = event.Records[0].s3.bucket.name;","  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\\+/g, ' '));","","  const user = key.split('/')[0];","  const taskId = key.split('/')[1];","","  const command = new UpdateCommand({","    TableName: tableName,","    Key: { user: `user#${user}`, id: `task#${taskId}` },","    UpdateExpression: 'SET upload = :u',","    ExpressionAttributeValues: {","      ':u': `s3://${bucket}/${key}`","    },","    ReturnValues: 'UPDATED_NEW'","  });","","  console.log(`UpdateCommand: ${JSON.stringify(command, null, 2)}`);","","  try {","    console.log(`Saving upload for task ${taskId}: s3://${bucket}/${key}`);","    const data = await ddbDocClient.send(command);","    console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));","  } catch (err) {","    console.log('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));","    throw err;","  }","","  console.log(`Detecting labels for bucket ${bucket} and key ${key}`);","","  const imageParams = {","    Image: {","      S3Object: {","        Bucket: bucket,","        Name: key","      }","    }","  };","","  const labelData = await rekognitionClient.send(","    new DetectLabelsCommand(imageParams)","  );","  console.log('Success, labels detected.', labelData);","  const labels = [];","  for (let j = 0; j < labelData.Labels.length; j++) {","    const name = labelData.Labels[j].Name;","    labels.push(name);","  }","","  console.log(`Label data: ${JSON.stringify(labels)}`);","","  const updateLabelsCommand = new UpdateCommand({","    TableName: tableName,","    Key: { user: `user#${user}`, id: `task#${taskId}` },","    UpdateExpression: 'SET labels = :s',","    ExpressionAttributeValues: {","      ':s': labels","    },","    ReturnValues: 'UPDATED_NEW'","  });","","  try {","    console.log(`Saving labels for task ${taskId}: ${labels}`);","    const data = await ddbDocClient.send(updateLabelsCommand);","    console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));","  } catch (err) {","    console.log('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));","    throw err;","  }","","  const response = {","    statusCode: 200,","    headers: {","      'Access-Control-Allow-Origin': '*'","    },","    body: JSON.stringify(labels)","  }","  return response;","};"],"id":2}]]},"ace":{"folds":[],"scrolltop":680,"scrollleft":0,"selection":{"start":{"row":90,"column":2},"end":{"row":90,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":44,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1730353775373,"hash":"34094836160ac80aacf2a40e1b0ca93571260767"}