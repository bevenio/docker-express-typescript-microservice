export abstract class BaseEntity {
  readonly id: string
}

export const DomainEntity = () => {
  return <T extends { new (...args: any[]): any }>(target: T) => {
    return class extends target {}
  }
}
