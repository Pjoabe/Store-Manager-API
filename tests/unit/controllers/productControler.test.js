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

  afterEach(function () {
    sinon.restore();
  });
});

