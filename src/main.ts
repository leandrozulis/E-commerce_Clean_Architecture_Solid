import { prisma } from './config/prisma.config'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductApiExpress } from './infra/api/express/route/Product/create-product.api.express'
import { ProductRepositoryPrisma } from './infra/repository/Product/product.repository.prisma'
import { CreateProductUseCase } from './usecases/Product/create-product.usecase'

function main() {

  // Prisma Repository

  const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

  // Use cases

  const createProductUseCase = CreateProductUseCase.create(productRepositoryPrisma)

  // Controllers

  const createProductController = CreateProductApiExpress.create(createProductUseCase)

  const api = ApiExpress.create([createProductController]) // controllers
  const port = 8000
  api.start(port)

}

main()