const fetch = require("node-fetch");
const { api_url } = require('./config')

exports.sourceNodes = async ({
  reporter,
  actions,
  createNodeId,
  createContentDigest
}, options) => {

  if (process.env.NODE_ENV == "development") {
    reporter.warn("Welcome to MYCustomer Plugin");
  }

  const {
    createNode
  } = actions; // Create nodes here, generally by downloading data
  // from a remote API.

  //endpoint
  const uri = `${api_url}/users`

  const resp = await fetch(uri);
  const data = await resp.json();

  data.forEach(customerData => {
    const nodeContent = JSON.stringify(customerData);
    const nodeMeta = {
      // the customer unique id is in _id
      id: createNodeId(`customer-${customerData.id}`),
      parent: null,
      children: [],
      internal: {
        // this will be important in finding the node
        type: `customer`,
        content: nodeContent,
        contentDigest: createContentDigest(customerData)
      }
    };
    const node = Object.assign({}, customerData, nodeMeta); // remove this once it works!

    console.log('\n customer id --> ', customerData.id);
    createNode(node);
  }); // We're done, return.

  return;
};