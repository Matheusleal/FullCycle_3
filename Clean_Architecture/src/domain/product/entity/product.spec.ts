import Product from "./product";


describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "123", 100)
    }).toThrow("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100)
    }).toThrow("Name is required");
  })

  it("should throw error when price is negative", () => {
    expect(() => {
      const product = new Product("1", "Item", -10)
    }).toThrow("Price cannot be negative");
  })

  it("should change name", () => {
    const product = new Product("1", "Item", 100)
    product.changeName("Item 2");

    expect(product.name).toBe("Item 2");
  })

  it("should throw error when change name with an empty name", () => {
    expect(() => {
      const product = new Product("1", "Item", 100)
      product.changeName("");
    }).toThrow("Name is required");
  })

  it("should change price", () => {
    const product = new Product("1", "Item", 100)
    product.changePrice(200);

    expect(product.price).toBe(200);
  })

  it("should throw error when change price with an negative price", () => {
    expect(() => {
      const product = new Product("1", "Item", 100)
      product.changePrice(-10);
    }).toThrow("Price cannot be negative");
  })
})