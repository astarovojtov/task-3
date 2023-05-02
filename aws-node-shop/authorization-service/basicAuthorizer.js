import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
function generatePolicy(principalId, resource, effect = 'Deny') {
    return {
        principalId,
        policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
            },
        ],
        }
    }
  };
  
export async function basicAuthorizer(event) {
    console.info("Event\n" + JSON.stringify(event, null, 2))
    if (event.type !== 'TOKEN')  throw new Unauthorized();
    const { authorizationToken } = event;
    const token = authorizationToken.replace('Basic ', '');
    const buffer = Buffer.from(token, 'base64');
    const [ user, password ] = buffer.toString('utf8').split(':');
    const storedPassword = process.env[user];
    const effect = storedPassword && storedPassword === password ? 'Allow' : 'Deny';
    return generatePolicy(token, event.methodArn, effect);
  };