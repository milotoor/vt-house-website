import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import addReservation from './add_reservation';
import getReservations from './get_reservations';
import { LAMBDA_ACTIONS } from './shared';

/**
 * Handles all incoming requests from the AWS Gateway API and delegates to
 * helper methods depending on the type of the request
 * 
 * @param event the event from the AWS Gateway API
 */
export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !event.queryStringParameters.type) {
    return makeResponse('bad request');
  }

  const { type } = event.queryStringParameters;

  let responseBody = null;
  switch (parseInt(type)) {
    case LAMBDA_ACTIONS.addReservation:
      responseBody = await addReservation(event);
      break;
    case LAMBDA_ACTIONS.getReservations:
      responseBody = await getReservations();
      break;
    default:
      break;
  }

  return makeResponse(responseBody);
};

function makeResponse (json: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
}
