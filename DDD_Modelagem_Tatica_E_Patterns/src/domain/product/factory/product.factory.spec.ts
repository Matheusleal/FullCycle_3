import Product from "../entity/product";
import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {

  it("should create a product type A", () => {

    const product = ProductFactory.create("a" ,"Product A", 100);

    expect(product).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  })

  it("should create a product type B", () => {

    const product = ProductFactory.create("b", "Product B", 100);

    expect(product).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200);
    expect(product.constructor.name).toBe("ProductB");
  })

})