import { Mall } from '../graphql/models/mall'
import { faker } from '@faker-js/faker'

export function MallDataBuilder(props: Partial<Mall>): Omit<Mall, 'id'> {
  return {
    name: props.name ?? faker.person.fullName(),
    address: props.address ?? faker.location.streetAddress(),
    isActive: props.isActive ?? true,
    createdAt: props.createdAt ?? new Date(),
  }
}
