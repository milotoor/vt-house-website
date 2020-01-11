
const uuid = require('node-uuid');
const { getDocumentClient, TABLE_NAME } = require('./shared');

const addReservation = async (event) => {
  // Make a connection to the DynamoDB table
  const docClient = getDocumentClient();

  // Grab relevant request parameters
  const { startDate, endDate } = event.queryStringParameters;
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuid.v4(),
      startDate,
      endDate
    }
  };

  console.log('Adding a new item...');
  await docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
    }
  }).promise();

  return 'success';
};

module.exports = addReservation;
