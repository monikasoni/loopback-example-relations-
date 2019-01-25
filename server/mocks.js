const { MockList } = require('graphql-tools')
const casual = require('casual');
// https://github.com/boo1ean/casual
const moment = require('moment');

casual.define('hours_list', () => {
  return [
    '09:00', '09:20', '09:40',
    '12:00', '12:20', '12:40'
  ];
});

casual.define('future_day', () => {
  const n = casual.integer(from=10, to=30);
  return moment()
    .add(n, "days")
    .format("YYYY-MM-DD");
});

const mocks = {
  Center: () => ({
    name: casual.company_name,
    services: () => new MockList(10) 
  }),
  Service: () => ({
    description: casual.words((n = 2)),
    professionals: () => new MockList([1, 4])
  }),
  Professional: () => ({
    fullName: casual.full_name,
    cmp: casual.numerify("#####"),
    description: casual.description
  }),
  Image: () => ({
    url: 'http://lorempixel.com/400/400/people'
  }),
  Date: () => ({
    day: casual.future_day,
    hours: casual.hours_list
  })
};

module.exports = mocks;
