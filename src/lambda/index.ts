import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { RequestHandler } from './RequestHandler';


/**
 * Pipes all incoming requests from the AWS Gateway API to the `RequestHandler`
 *
 * @param {APIGatewayEvent} event: the event from the AWS Gateway API
 */
export async function handler (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return new RequestHandler(event).handle();
}
