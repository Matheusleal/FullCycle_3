import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync()
  }, 10000);

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {

    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    var createdProduct = await ProductModel.findOne({ where: { id: "1" } });

    expect(createdProduct.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10
    });
  })

  it("should update a product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    let createdProduct = await ProductModel.findOne({ where: { id: "1" } });

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    let updatedProduct = await ProductModel.findOne({ where: { id: "1" } });

    expect(updatedProduct.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 20
    })
  })

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    let createdProduct = await ProductModel.findOne({ where: { id: "1" } });

    const productFound = await productRepository.find("1");

    expect(createdProduct.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price
    })
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 13);
    await productRepository.create(product2);

    const products = [product, product2];

    const foundProducts = await productRepository.findAll();

    expect(products).toEqual(foundProducts);

  })
})