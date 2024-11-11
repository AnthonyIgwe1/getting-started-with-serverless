{"filter":false,"title":"app.mjs","tooltip":"/serverless-tasks-webapp/sam/src/auth/app.mjs","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":43},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":1,"column":0},"end":{"row":41,"column":1},"action":"insert","lines":["import jwt from 'njwt';","","export const handler = function (event, context, callback) {","  console.info('received:', event);","  const token = event.authorizationToken.split(' ')[1];","  jwt.verify(token, 'secretphrase', (err, verifiedJwt) => {","    if (err) {","      console.log(err.message);","      callback('Error: Invalid token');","    } else {","      console.log(`Verified token: ${verifiedJwt}`);","      const resource = `${event.methodArn.split('/', 2).join('/')}/*`;","      const policy = generatePolicy(verifiedJwt.body.sub, 'Allow', resource);","      console.log(`Generated policy: ${JSON.stringify(policy)}`);","      callback(null, policy);","    }","  });","};","","const generatePolicy = (principalId, effect, resource) => {","  const authResponse = {};","","  authResponse.principalId = principalId;","  if (effect && resource) {","    const policyDocument = {};","    policyDocument.Version = '2012-10-17';","    policyDocument.Statement = [];","    const statementOne = {};","    statementOne.Action = 'execute-api:Invoke';","    statementOne.Effect = effect;","    statementOne.Resource = resource;","    policyDocument.Statement[0] = statementOne;","    authResponse.policyDocument = policyDocument;","  }","","  authResponse.context = {","    userId: 1,","    createdAt: new Date().toISOString()","  }","  return authResponse;","}"],"id":3}]]},"ace":{"folds":[],"scrolltop":305.5,"scrollleft":0,"selection":{"start":{"row":41,"column":1},"end":{"row":41,"column":1},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1730350277277,"hash":"bc33a5c1d8043aad4bd472a3fecdd5b92563da4d"}