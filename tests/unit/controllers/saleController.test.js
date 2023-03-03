const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai);

const saleService = require("../../../src/services/saleService");
const saleController = require("../../../src/controllers/saleController");
const { rightSaleBody } = require("../mocks/sales.mock");
const conection = require("../../../src/models/conection");

describe("test the sales on controller layer", function () {
  let req;
  let res;
  let searchByIdStub;
  let searchAllSalesStub;
  let executeStub;

  beforeEach(function () {
    res = {};
    req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    searchByIdStub = sinon.stub(saleService, "searchById");
    searchAllSalesStub = sinon.stub(saleService, "searchAllSales");
    executeStub = sinon.stub(conection, "execute");
  });

  afterEach(function () {
    sinon.restore();
  });

  it("should return status 200 and search by id", async function () {
    req.params = { id: 5 };
    searchByIdStub.resolves({ message: rightSaleBody });
    executeStub.resolves([[rightSaleBody]]);
    await saleController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it("should list all the products", async function () {
    searchAllSalesStub.resolves({ message: rightSaleBody });
    executeStub.resolves([[rightSaleBody]]);
    await saleController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it("should return an 404 error when an invalid id is inserted", async function () {
    req.params = { id: 666 };
    searchByIdStub.resolves({ type: 404, message: "Sale not found" });
    executeStub.resolves([{}]);
    await saleController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    
    expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
  });
});
