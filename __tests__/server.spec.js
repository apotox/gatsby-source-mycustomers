const fetch = require("node-fetch");
const { api_url } = require('../src/config')

class MyCustomers {
    static check() {
        return fetch(`${api_url}/users`)
    }
}

describe("API MyCustomers", () => {
    test("Connect to the Server", () => {
        jest.mock('node-fetch');
        return MyCustomers.check().then(result => expect(result.ok).toBe(true))
    })
});