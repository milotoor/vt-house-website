import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import addReservation from './add_reservation';
import { LAMBDA_ACTIONS } from './shared';

exports.handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters && event.queryStringParameters.action) {
    const { action } = event.queryStringParameters;

    let responseBody = null;
    switch (action) {
      case LAMBDA_ACTIONS.addReservation:
        responseBody = await addReservation(event);
        break;
      default:
        break;
    }

    return makeResponse(responseBody);
  }

  console.log('bad');
  return makeResponse('bad request');
};

function makeResponse (json: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json'
    }
  };
}