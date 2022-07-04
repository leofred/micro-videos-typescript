import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator
} from './category.validator'

describe('CategoryValidator Tests', () => {
  let validator: CategoryValidator

  beforeEach(() => {
    validator = CategoryValidatorFactory.create()
  })
  test('Invalid cases for name field', () => {
    const errors = [
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters'
    ]
    const arrange = [
      {
        data: null,
        errors
      },
      {
        data: { name: null },
        errors
      },
      { data: { name: '' }, errors: [errors[0]] },
      {
        data: { name: 5 as any },
        errors: [errors[1], errors[2]]
      },
      {
        data: { name: 'a'.repeat(256) },
        errors: [errors[2]]
      }
    ]
    arrange.forEach((item) => {
      expect({ validator, data: item.data }).containsErrorMessages({
        name: item.errors
      })
    })
  })
  test('Invalid cases for description field', () => {
    expect({ validator, data: { description: 5} }).containsErrorMessages({
      description: ['description must be a string']
    })
  })
  test('Invalid cases for is_active field', () => {
    expect({ validator, data: { is_active: 0} }).containsErrorMessages({
      is_active: ['is_active must be a boolean value']
    })
  })

  test('valid cases for fields', () => {
    const arrange = [
      { name: 'some value' },
      { name: 'some value', description: null },
      { name: 'some value', description: undefined as any },
      { name: 'some value', is_active: true },
      { name: 'some value', is_active: false }
    ]

    arrange.forEach((item) => {
      const isValid = validator.validate(item)
      expect(isValid).toBeTruthy()
      expect(validator.validatedData).toStrictEqual(new CategoryRules(item))
    })
  })
})
