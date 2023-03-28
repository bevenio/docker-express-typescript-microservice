import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity('product')
export class Product extends BaseEntity {
  @ObjectIdColumn()
  id: number

  @Column()
  price: number

  @Column()
  amount: number

  @Column()
  name: string

  @Column()
  totalSold: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
