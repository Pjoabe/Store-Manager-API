const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsResponse1, error4041, products } = require('./productService.mock')

describe("test the service layer", function () {
  it("Should return an error when searching for a product by its id", async function () {
    sinon.stub(productModel, "getById").resolves(5);
    const result = await productService.productById(500);

    expect(result).to.be.deep.equal(error4041);
  });

  it("Should search for a product by its id", async function () {
    sinon.stub(productModel, "getById").resolves(allProductsResponse1);
    const result = await productService.productById(1);

    expect(result).to.be.deep.equal(allProductsResponse1);
  });

  it("Should search for all products", async function () {
    sinon.stub(productModel, "getAll").resolves(allProductsResponse1);
    const result = await productService.allProducts();

    expect(result).to.be.deep.equal(allProductsResponse1);
  });

  it("should register a new product", async function () {
    sinon.stub(productModel, "insertSQL").resolves(5);
    sinon.stub(productModel, "getById").resolves([allProductsResponse1[2]]);

    const result = await productService.newInsertion("ProdutoX");

    expect(result).to.be.deep.equal([allProductsResponse1[2]]);
  });


 it("should update a product by his id", async function () {
   sinon.stub(productModel, "getById").resolves([allProductsResponse1[2]]);
   sinon.stub(productModel, "updateSQL").resolves({ affectedRows: 1 });
   const result = await productService.updateProductNameById([
     allProductsResponse1[2],
   ]);

   expect(result).to.be.deep.equal([allProductsResponse1[2]]);
 });


  afterEach(function () {
    sinon.restore();
  });

});
