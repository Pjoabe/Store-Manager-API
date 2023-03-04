const { expect } = require("chai");
const sinon = require("sinon");
const salesServices = require("../../../src/services/saleService");
const saleModel = require("../../../src/models/saleModel");
const { rightSaleBody } = require("../mocks/sales.mock");
const connection = require("../../../src/models/conection");
const productModel = require('../../../src/models/productModel')

describe("test the sales on the service layer", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should return a 404 error when the sale is not found", async function () {
    sinon.stub(saleModel, "getSaleDetailsById").resolves();
    sinon.stub(connection, "execute").resolves([{}]);
    const result = await salesServices.searchById(666);

    expect(result.type).to.equal(404);

    expect(result.message).to.deep.equal({ message: "Sale not found" });
  });

  it("should return all sale details", async function () {
    sinon.stub(saleModel, "getAllSaleDetails").resolves(rightSaleBody);
    sinon.stub(connection, "execute").resolves([rightSaleBody]);
    const result = await salesServices.searchAllSales();

    expect(result.type).to.be.equal(200);

    expect(result.message).to.deep.equal(rightSaleBody);
  });

  it("should return a specific sale by id", async function () {
    sinon.stub(saleModel, "getSaleDetailsById").resolves([rightSaleBody[1]]);
    sinon.stub(connection, "execute").resolves([[rightSaleBody[1]]]);
    const result = await salesServices.searchById(1);

    expect(result.type).to.equal(200);

    expect(result.message).to.deep.equal([rightSaleBody[1]]);
  });

    it("should return an error about the quantity", async function () {
      sinon.stub(productModel, "getById").resolves([rightSaleBody[1]]);
      sinon.stub(connection, "execute").resolves([[rightSaleBody[1]]]);
      const result = await salesServices.insertNewSale([
        {
          productId: 2,
        },
      ]);
      expect(result.type).to.equal(400);
      expect(result.message).to.equal('"quantity" is required');
    });

});
