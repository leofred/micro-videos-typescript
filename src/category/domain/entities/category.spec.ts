import { Category, CategoryProperties } from './category'
import omit from 'lodash/omit'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'

describe('Category Unit Tests', () => {
  beforeEach(() => {
    Category.validate = jest.fn()
  })
  test('constructor of Category', () => {
    let category = new Category({ name: 'any_category' })
    let props = omit(category.props, 'created_at')

    expect(Category.validate).toHaveBeenCalled()
    expect(props).toStrictEqual({
      name: 'any_category',
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'any_category',
      description: 'any_description',
      is_active: false,
      created_at
    })
    expect(category.props).toStrictEqual({
      name: 'any_category',
      description: 'any_description',
      is_active: false,
      created_at
    })

    category = new Category({
      name: 'any_category',
      description: 'other_description'
    })
    expect(category.props).toMatchObject({
      name: 'any_category',
      description: 'other_description'
    })

    category = new Category({
      name: 'any_category',
      is_active: true
    })
    expect(category.props).toMatchObject({
      name: 'any_category',
      is_active: true
    })

    created_at = new Date()
    category = new Category({
      name: 'any_category',
      created_at
    })
    expect(category.props).toMatchObject({
      name: 'any_category',
      created_at
    })
  })

  test('id field', () => {
    type CategoryPropsData = { props: CategoryProperties; id?: UniqueEntityId }
    const data: CategoryPropsData[] = [
      { props: { name: 'any_category' } },
      { props: { name: 'any_category' }, id: null },
      { props: { name: 'any_category' }, id: undefined },
      { props: { name: 'any_category' }, id: new UniqueEntityId() }
    ]

    data.forEach((i) => {
      const category = new Category(i.props, i.id)
      expect(category.id).not.toBeNull()
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    })
  })

  test('Getter and Setter of name prop', () => {
    const category = new Category({ name: 'any_name' })
    expect(category.name).toBe('any_name')

    category['name'] = 'other_name'
    expect(category.name).toBe('other_name')
  })

  test('Getter and setter of description prop', () => {
    let category = new Category({
      name: 'any_category'
    })
    expect(category.description).toBeNull()

    category = new Category({
      name: 'any_category',
      description: 'any_description'
    })
    expect(category.description).toBe('any_description')

    category = new Category({
      name: 'any_category'
    })
    category['description'] = 'any_description'
    expect(category.description).toBe('any_description')
    category['description'] = undefined
    expect(category.description).toBeNull()
    category['description'] = null
    expect(category.description).toBeNull()
  })

  test('Getter and setter of is_active prop', () => {
    let category = new Category({
      name: 'any_category'
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'any_category',
      is_active: true
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'any_category',
      is_active: false
    })
    expect(category.is_active).toBeFalsy()

    category = new Category({
      name: 'any_category'
    })
    category['is_active'] = false
    expect(category.is_active).toBeFalsy()
    category['is_active'] = undefined
    expect(category.is_active).toBeTruthy()
    category['is_active'] = null
    expect(category.is_active).toBeTruthy()
  })

  test('Getter of created_at prop', () => {
    let category = new Category({
      name: 'any_category'
    })
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'any_category',
      created_at
    })
    expect(category.created_at).toBe(created_at)
  })
  
  it('should update a category', () => {
    const category = new Category({ name: 'any_category' })
    category.update('Documentary', 'some description')
    expect(Category.validate).toHaveBeenCalledTimes(2)
    expect(category.name).toBe('Documentary')
    expect(category.description).toBe('some description')
  })

  it('should activate a category', () => {
    const category = new Category({
      name: 'any_category',
      is_active: false
    })
    category.activate()
    expect(category.is_active).toBeTruthy()
  })

  it('should deactivate a category', () => {
    const category = new Category({
      name: 'any_category',
      is_active: true
    })
    category.deactivate()
    expect(category.is_active).toBeFalsy()
  })  
})
