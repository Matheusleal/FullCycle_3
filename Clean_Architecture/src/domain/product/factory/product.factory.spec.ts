import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {

  it("should create a product", () => {

    const product = ProductFactory.create("Product A", 100);

    expect(product).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  })

})