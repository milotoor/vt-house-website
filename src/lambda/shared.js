
const aws = require('aws-sdk');


aws.config.update({ region: "us-west-2" });

function getDocumentClient () {
  return new aws.DynamoDB.DocumentClient();
}

const TABLE_NAME = 'vt_reservations';

const LAMBDA_ACTIONS = {
  addReservation: '1'
};

module.exports = {
  getDocumentClient,
  TABLE_NAME,
  LAMBDA_ACTIONS
};
