const { expect } = require("chai");
const sinon = require("sinon");
const { getAll } = require('../../../src/models/productModel');
const connection = require('../../../src/models/conection');
const { allProductsResponse } = require('../../../__tests__/_dataMock');

describe("test the model layer", function () {
  it(" should search for all products", async function () {
    sinon.stub(connection, "execute").resolves([allProductsResponse]);
    const result = await getAll();
    expect(result).to.be.deep.equal(allProductsResponse);
  });
  afterEach(function () {
    sinon.restore();
  });
});
