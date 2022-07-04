import Entity from '../entity/entity'
import NotFoundError from '../errors/not-found.error'
import UniqueEntityId from '../value-objects/unique-entity-id.vo'
import InMemoryRepository from './in-memory.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository

  beforeEach(() => (repository = new StubInMemoryRepository()))

  it('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })
    await repository.insert(entity)
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it('should throws error when entity not found', async () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found: fake id`)
    )

    const id = 'a0ece5db-cd14-4f21-812f-966d1d6cf919'
    expect(repository.findById(new UniqueEntityId(id))).rejects.toThrow(
      new NotFoundError(`Entity not found: ${id}`)
    )
  })

  it('should find entity by id', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })
    await repository.insert(entity)
    let entityFound = await repository.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())

    entityFound = await repository.findById(entity.uniqueEntityId)
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())
  })

  it('should returns all entities', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })
    await repository.insert(entity)
    const entities = await repository.findAll()
    expect(entities).toStrictEqual([entity])
  })

  it('should throws error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })

    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found: ${entity.id}`)
    )
  })

  it('should update entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })
    await repository.insert(entity)

    const entityUpdated = new StubEntity(
      { name: 'name updated', price: 1 },
      entity.uniqueEntityId
    )

    await repository.update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON())

  })

  it('should throws error on delete when entity not found', async () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found: fake id`)
    )

    const id = 'a0ece5db-cd14-4f21-812f-966d1d6cf919'
    expect(repository.delete(new UniqueEntityId(id))).rejects.toThrow(
      new NotFoundError(`Entity not found: ${id}`)
    )
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 })
    await repository.insert(entity)
    await repository.delete(entity.id)
    expect(repository.items).toHaveLength(0)

    await repository.insert(entity)
    await repository.delete(entity.uniqueEntityId)
    expect(repository.items).toHaveLength(0)
  })
})
