const { expect } = require("chai");
const sinon = require("sinon");
const saleModel = require("../../../src/models/saleModel");
const connection = require("../../../src/models/conection");
const { rightSaleBody } = require("../mocks/sales.mock");

describe("test the sales on model layer", function () {
  let connectionStub;

  beforeEach(function () {
    connectionStub = sinon.stub(connection, "execute");
  });

  afterEach(function () {
    sinon.restore();
  });

  it("should get sale details by id", async function () {
    connectionStub.resolves([[rightSaleBody[0]]]);
    const result = await saleModel.getSaleDetailsById(1);

    expect(result).to.be.deep.equal([rightSaleBody[0]]);
  });

  it("should get all sale details", async function () {
    connectionStub.resolves([rightSaleBody]);
    const result = await saleModel.getAllSaleDetails();

    expect(result).to.be.deep.equal(rightSaleBody);
  });
});
