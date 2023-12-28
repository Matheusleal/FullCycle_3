import Product from "./product"


describe("Product unit tests", () => {

  it("should notify when id is empty", () => {
    const product = new Product("", "123", 100)

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Id is required")
  })

  it("should notify when name is empty", () => {
    const product = new Product("1", "", 100)

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Name is required")
  })

  it("should notify when price is negative", () => {
    const product = new Product("1", "Item", -10)

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Price cannot be negative")
  })

  it("should notify when name is empty and price is negative", () => {
    const product = new Product("1", "", -10)

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Name is required, product: Price cannot be negative")
  })

  it("should change name", () => {
    const product = new Product("1", "Item", 100)
    product.changeName("Item 2")

    expect(product.name).toBe("Item 2")
  })

  it("should notify when change name with an empty name", () => {
    const product = new Product("1", "Item", 100)
    product.changeName("")

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Name is required")
  })

  it("should change price", () => {
    const product = new Product("1", "Item", 100)
    product.changePrice(200)

    expect(product.price).toBe(200)
  })

  it("should notify when change price with an negative price", () => {
    const product = new Product("1", "Item", 100)
    product.changePrice(-10)

    expect(product.isValid).toBeFalsy()
    expect(product.getMessages()).toEqual("product: Price cannot be negative")
  })
})