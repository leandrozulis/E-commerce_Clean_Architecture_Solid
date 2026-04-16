import { prisma } from './config/prisma.config'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductApiExpress } from './infra/api/express/route/Product/create-product.api.express'
import { RemoveProductApiExpress } from './infra/api/express/route/Product/remove-product.api.express'
import { ProductRepositoryPrisma } from './infra/repository/Product/product.repository.prisma'
import { CreateProductUseCase } from './usecases/Product/create-product.usecase'
import { RemoveProductUseCase } from './usecases/Product/remove-product.usecase'

function main() {

  // Prisma Repository

  const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

  // Use cases

  const createProductUseCase = CreateProductUseCase.create(productRepositoryPrisma)
  const removeProductUseCase = RemoveProductUseCase.create(productRepositoryPrisma)

  // Controllers

  const createProductController = CreateProductApiExpress.create(createProductUseCase)
  const removeProductController = RemoveProductApiExpress.create(removeProductUseCase)

  const api = ApiExpress.create([
    createProductController,
    removeProductController
  ]) // controllers

  const port = 8000
  api.start(port)

}

main()