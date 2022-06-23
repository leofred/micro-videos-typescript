import { Category, CategoryProperties } from './category'
import omit from 'lodash/omit'
import UniqueEntityId from '../../../@seedwork/domain/unique-entity-id.vo'

describe('Category Unit Tests', () => {
  test('construtor da categoria', () => {
    let category = new Category({ name: 'any_category' })
    let props = omit(category.props, 'created_at')
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

    data.forEach(i => {
      const category = new Category(i.props, i.id)
      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  test('Getter of name prop', () => {
    const category = new Category({ name: 'any_category' })
    expect(category.name).toBe('any_category')
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
})
