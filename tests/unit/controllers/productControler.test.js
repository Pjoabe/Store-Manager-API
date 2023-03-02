const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const {
  allProductsResponse,
  productSearchNameResponse,
  error404,
} = require('../../../__tests__/_dataMock');

describe("test the controller layer", function () {
  it("should search a product by its id", async function () {
    const res = {};
    const req = { params: { id: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "productById")
      .resolves(productSearchNameResponse);
    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    
    expect(res.json).to.have.been.calledWith(productSearchNameResponse[0]);
  });

it("should throw 404 error", async function () {
  const res = {};
  const req = { params: { id: 24 } };
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  sinon.stub(productService, "productById").resolves(error404);
  await productController.getProductById(req, res);

  expect(res.status).to.have.been.calledWith(404);

  expect(res.json).to.have.been.calledWith(error404);
});

 it("should search for all products", async function () {
   const res = {};
   const req = {};
   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();
   sinon.stub(productService, "allProducts").resolves(allProductsResponse);
   await productController.getAllProducts(req, res);

   expect(res.status).to.have.been.calledWith(200);

   expect(res.json).to.have.been.calledWith(allProductsResponse);
 });
  
 it("", function () {

 }); 
  
  afterEach(function () {
    sinon.restore();
  });
});

