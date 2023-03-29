import { BrandModel, IBrandModel } from '@/data/models/BrandModel'
import { BaseRepository } from '@/data/repositories/BaseRepository'

export const BrandRepository: BaseRepository<IBrandModel> = {
  findAll: async () => {
    return await BrandModel.find().lean()
  },

  findById: async (id) => {
    return await BrandModel.findById(id).lean()
  },

  create: (item) => {
    return new BrandModel(item)
  },

  createMany: (items) => {
    return items.map((item) => {
      return new BrandModel(item)
    })
  },

  save: (item) => {
    new BrandModel(item).save()
  },

  saveMany: (items) => {
    BrandModel.bulkSave(items.map((item) => new BrandModel(item)))
  },

  delete: (id) => {
    BrandModel.deleteOne({ id: id })
  },

  deleteMany: (ids) => {
    BrandModel.deleteMany({ id: { $in: ids } })
  },
}
