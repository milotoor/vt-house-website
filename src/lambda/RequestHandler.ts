import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import moment from 'moment';

import { DynamoDBManager } from './DynamoDBManager';
import { LAMBDA_ACTIONS } from './shared';


/** ======================== Types ========================================= */
type RequestParamKeys = 'end' | 'id' | 'name' | 'notes' | 'start' | 'secret' | 'type';
type RequestParams = Partial<{
  [Key in RequestParamKeys]: string;
}>;

/** ======================== Request handler =============================== */
/**
 * Handles all incoming requests from the AWS Gateway API. Operations that
 * interface with DynamoDB are forwarded to the manager
 */
export class RequestHandler {
  private dynamoClient: DynamoDBManager;
  private readonly params: RequestParams;

  constructor (event: APIGatewayEvent) {
    this.dynamoClient = new DynamoDBManager();

    // Extract all possible query parameters. Not all params will be provided
    // with every request-- it's up to the individual handling methods to
    // verify that the parameters they're expecting were provided
    this.params = event.queryStringParameters || {};
  }

  /**
   * Handles a request. This is the only public method on the class
   */
  public async handle () {
    const { type } = this.params;
    if (!type) return RequestHandler.error(400, '"type" query parameter is required');

    switch (type) {
      case LAMBDA_ACTIONS.deleteReservation:
        return await this.deleteReservation();
      case LAMBDA_ACTIONS.getReservations:
        return await this.getReservations();
      case LAMBDA_ACTIONS.updateReservation:
        return await this.updateReservation();
      default:
        return RequestHandler.error(400, `"type" query parameter is invalid: "${type}"`);
    }
  }

  /**
   * Handles a request to delete a reservation
   */
  private async deleteReservation () {
    const { id } = this.params;

    // Validate that all required params are present
    if (!id) return RequestHandler.error(400, '"id" query parameter is required');

    const error = await this.dynamoClient.delete(id);
    return error
      ? RequestHandler.error(404, `unable to delete reservation with id "${id}"`)
      : RequestHandler.respond('success');
  }

  /**
   * Handles a request to get existing reservation records. If the correct
   * secret is passed, full reservation records are returned; otherwise only
   * "basic" reservation records (i.e. start and end dates) are returned.
   */
  private async getReservations () {
    const { secret } = this.params;

    // Basic reservations are the subset of data everyone can access
    const reservations = await this.dynamoClient.get();
    const basicReservations = reservations.map(r => _.pick(r, ['start', 'end']));

    // Authenticate the user-- all users can access the start and end of the reservation, only admin
    // can access the rest of the reservation info
    const pw = process.env.PASSWORD;

    // We will return the reservation info in full if three conditions are met:
    //   1. A password has been set in the Lambda environment variables
    //   2. A secret was provided
    //   3. The secret and the password match
    //
    // If only (1) and (2) are met, we raise a 403 (HTTP forbidden) error because
    // the user is attempting to access privileged information but is not
    // providing the right password.
    if (typeof pw !== 'undefined' && typeof secret !== 'undefined') {
      return secret === pw
        ? RequestHandler.respond(reservations)
        : RequestHandler.error(403, 'invalid password');
    } else {
      return RequestHandler.respond(basicReservations);
    }
  }

  /**
   * Handles a request to update an existing reservation or create a new one if
   * none with the given `id` exist.
   */
  private async updateReservation () {
    const { end, id, name, notes, start } = this.params;

    // Validate that all required params are present
    if (!start || !end || !name) {
      return RequestHandler.error(400, '"start", "end" and "name" query parameters are required');
    }

    // Validate that the start and end are dates
    if (!moment(start).isValid() || !moment(end).isValid()) {
      return RequestHandler.error(400, 'invalid date range');
    }

    const { error, item } = await this.dynamoClient.update(start, end, name, id, notes);
    return error ? RequestHandler.error(400, error.message) : RequestHandler.respond(item);
  };

  /** ======================== Response utils ================================= */
  static headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  /**
   * Creates the JSON-response object returned from the Lambda function
   *
   * @param {object} body: the body of the response
   */
  private static respond (body: any) {
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: RequestHandler.headers
    };
  }

  /**
   * Creates the JSON-response object for an error response
   *
   * @param {number} code: the error-code of the response
   * @param {string} [message]: the reason for the error
   */
  private static error (code: number, message: string) {
    return {
      statusCode: code,
      body: message || '',
      headers: RequestHandler.headers
    };
  }
}
