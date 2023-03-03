const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const connection = require('../../../src/models/conection');
const { allProductsResponse,error404 } = require('../../../__tests__/_dataMock');

describe("test the service layer", function () {
  it("Should return an error when searching for a product by its id", async function () {
    sinon.stub(productModel, "getById").resolves(5);
    const result = await productService.productById(500);

    expect(result).to.be.deep.equal(error404);
  });

  it("Should search for a product by its id", async function () {
    sinon.stub(productModel, "getById").resolves(allProductsResponse);
    const result = await productService.productById(1);

    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it("Should search for all products", async function () {
    sinon.stub(productModel, "getAll").resolves(allProductsResponse);
    const result = await productService.allProducts();

    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it("should register a new product", async function () {
    sinon.stub(productModel, "insertSQL").resolves(5);
    sinon.stub(productModel, "getById").resolves([allProductsResponse[2]]);

    const result = await productService.newInsertion("ProdutoX");

    expect(result).to.be.deep.equal([allProductsResponse[2]]);
  });

 it("should throw 404 error about wrong product insertion", async function () {

 });

  afterEach(function () {
    sinon.restore();
  });

});
