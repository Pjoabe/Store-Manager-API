const { expect } = require("chai");
const sinon = require("sinon");
const { getAll, getById } = require('../../../src/models/productModel');
const connection = require('../../../src/models/conection');
const { allProductsResponse1, updatedName } = require('./productModel.mock');
const productModel = require('../../../src/models/productModel')

describe("test the model layer", function () {
  it(" should search for all products", async function () {
    sinon.stub(connection, "execute").resolves([allProductsResponse1]);
    const result = await getAll();
    expect(result).to.be.deep.equal(allProductsResponse1);
  });
  afterEach(function () {
    sinon.restore();
  });

    it("should search a product by its id", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse1[2]]);

      const result = await getById(2);

      expect(result).to.be.deep.equal(allProductsResponse1[2]);
    });
  
  it("should register a new product", async function () {
     sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
     const result = await productModel.insertSQL(allProductsResponse1[0]);

     expect(result).to.equal(4);
   });
  
   it("should update a product by its id", async function () {
     sinon.stub(connection, "execute").resolves([1, updatedName]);
     const result = await productModel.updateSQL(1, updatedName);

     expect(result).to.be.deep.equal(1, updatedName);
   });
  
});
