import { ProductInterface, ProductModel } from '@/data/models/ProductModel'
import { BaseRepository } from '@/data/repositories/BaseRepository'

export const ProductRepository: BaseRepository<ProductInterface> = {
  findAll: async () => {
    return await ProductModel.find().lean()
  },

  findById: async (id) => {
    return await ProductModel.findById(id).lean()
  },

  create: (item) => {
    return new ProductModel(item)
  },

  createMany: (items) => {
    return items.map((item) => {
      return new ProductModel(item)
    })
  },

  save: (item) => {
    new ProductModel(item).save()
  },

  saveMany: (items) => {
    ProductModel.bulkSave(items.map((item) => new ProductModel(item)))
  },

  delete: (id) => {
    ProductModel.deleteOne({ _id: id })
  },

  deleteMany: (ids) => {
    ProductModel.deleteMany({ _id: ids })
  },
}
