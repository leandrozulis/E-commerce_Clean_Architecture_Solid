import { prisma } from './config/prisma.config'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductApiExpress } from './infra/api/express/route/Product/create-product.api.express'
import { FindProductApiExpress } from './infra/api/express/route/Product/find-product.api.express'
import { ListProductApiExpress } from './infra/api/express/route/Product/list-product.api.express'
import { RemoveProductApiExpress } from './infra/api/express/route/Product/remove-product.api.express'
import { UpdateProductApiExpress } from './infra/api/express/route/Product/update-product.api.express'
import { ProductRepositoryPrisma } from './infra/repository/Product/product.repository.prisma'
import { CreateProductUseCase } from './usecases/Product/create-product.usecase'
import { FindProductUseCase } from './usecases/Product/find-product.usecase'
import { ListProductUseCase } from './usecases/Product/list-product.usecase'
import { RemoveProductUseCase } from './usecases/Product/remove-product.usecase'
import { UpdateProductUseCase } from './usecases/Product/update-product.usecase'

function main() {

  // Prisma Repository

  const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

  // Use cases

  const createProductUseCase = CreateProductUseCase.create(productRepositoryPrisma)
  const removeProductUseCase = RemoveProductUseCase.create(productRepositoryPrisma)
  const findProductUseCase = FindProductUseCase.create(productRepositoryPrisma)
  const listProductUseCase = ListProductUseCase.create(productRepositoryPrisma)
  const updateProductUseCase = UpdateProductUseCase.create(productRepositoryPrisma)

  // Controllers

  const createProductController = CreateProductApiExpress.create(createProductUseCase)
  const removeProductController = RemoveProductApiExpress.create(removeProductUseCase)
  const findProductController = FindProductApiExpress.create(findProductUseCase)
  const listProductController = ListProductApiExpress.create(listProductUseCase)
  const updateProductController = UpdateProductApiExpress.create(updateProductUseCase)

  const api = ApiExpress.create([
    createProductController,
    removeProductController,
    findProductController,
    listProductController,
    updateProductController
  ]) // controllers

  const port = 8000
  api.start(port)

}

main()