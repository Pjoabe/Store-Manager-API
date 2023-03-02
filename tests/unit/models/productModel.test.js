const { expect } = require("chai");
const sinon = require("sinon");
const { getAll, getById } = require('../../../src/models/productModel');
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

    it("should search a product by its id", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse[2]]);

      const result = await getById(2);

      expect(result).to.be.deep.equal(allProductsResponse[2]);
    });
});
