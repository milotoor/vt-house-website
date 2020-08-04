import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import addReservation from './add_reservation';
import getReservations from './get_reservations';
import { error, LAMBDA_ACTIONS } from './shared';


/**
 * Handles all incoming requests from the AWS Gateway API and delegates to
 * helper methods depending on the type of the request
 *
 * @param event the event from the AWS Gateway API
 */
export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !event.queryStringParameters.type) {
    return error(400);
  }

  let responseBody = null;
  switch (parseInt(event.queryStringParameters.type)) {
    case LAMBDA_ACTIONS.addReservation:
      return responseBody = await addReservation(event);
    case LAMBDA_ACTIONS.getReservations:
      return responseBody = await getReservations(event);
    default:
      return error(400);
  }
}
