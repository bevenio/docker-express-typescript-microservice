import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

import { Product } from './product'

@Entity('brand')
export class Brand extends BaseEntity {
  @ObjectIdColumn()
  id: number

  @Column({
    unique: true,
  })
  name: string

  @Column()
  products: Product

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
