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
  allProductsResponse1,
  productSearchNameResponse1,
  error4041,
  rightProductBody1,
  notInsert1,
} = require('./productController.mock');


describe("test the controller layer", function () {
  it("should search a product by its id", async function () {
    const res = {};
    const req = { params: { id: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "productById")
      .resolves(productSearchNameResponse1);
    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    
    expect(res.json).to.have.been.calledWith(productSearchNameResponse1[0]);
  });

it("should throw 404 error", async function () {
  const res = {};
  const req = { params: { id: 24 } };
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  sinon.stub(productService, "productById").resolves(error4041);
  await productController.getProductById(req, res);

  expect(res.status).to.have.been.calledWith(404);

  expect(res.json).to.have.been.calledWith(error4041);
});

 it("should search for all products", async function () {
   const res = {};
   const req = {};
   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();
   sinon.stub(productService, "allProducts").resolves(allProductsResponse1);
   await productController.getAllProducts(req, res);

   expect(res.status).to.have.been.calledWith(200);

   expect(res.json).to.have.been.calledWith(allProductsResponse1);
 });
  
  it("should register a new product", async function () {
    const res = {};
    const req = { body: { name: "ProdutoN" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "newInsertion").resolves([rightProductBody1]);
    await productController.newProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);

    expect(res.json).to.have.been.calledWith(rightProductBody1);
  });

 it("should throw 404 error about wrong product insertion", async function () {
   const res = {};
   const req = { body: { name: "EUAE" } };
   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();
   sinon.stub(productService, "newInsertion").resolves(notInsert1);
   await productController.newProduct(req, res);

   expect(res.status).to.have.been.calledWith(404);

   expect(res.json).to.have.been.calledWith(notInsert1);
 });

  afterEach(function () {
    sinon.restore();
  });
});

