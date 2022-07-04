// import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error'
import { Category } from './category'

type ErrorString =
  | 'name should not be empty'
  | 'name must be a string'
  | 'name must be shorter than or equal to 255 characters'
  
describe('Category Integration Tests', () => {
  const errors: ErrorString[] = [
    'name should not be empty',
    'name must be a string',
    'name must be shorter than or equal to 255 characters'
  ]

  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: errors
      })

      expect(() => new Category({ name: '' })).containsErrorMessages({
        name: [errors[0]]
      })

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [errors[1], errors[2]]
      })

      expect(
        () => new Category({ name: 'a'.repeat(256) })
      ).containsErrorMessages({
        name: [errors[2]]
      })
    })

    it('should a invalid category using description property', () => {
      expect(
        () => new Category({ description: 5 } as any)
      ).containsErrorMessages({
        description: ['description must be a string']
      })
    })

    it('should a invalid category using is_active property', () => {
      expect(() => new Category({ is_active: 5 } as any)).containsErrorMessages(
        {
          is_active: ['is_active must be a boolean value']
        }
      )
    })

    it('should a valid category', () => {
      expect.assertions(0)
      /* NOSONAR */ new Category({ name: 'valid_name' })
      /* NOSONAR */ new Category({ name: 'valid_name', description: null })
      /* NOSONAR */ new Category({
        name: 'valid_name',
        description: 'valid_description'
      })
      /* NOSONAR */ new Category({
        name: 'valid_name',
        description: 'valid_description',
        is_active: true
      })
      /* NOSONAR */ new Category({
        name: 'valid_name',
        description: 'valid_description',
        is_active: false
      })
    })
  })
  describe('update method', () => {
    it('should a invalid category using name property', () => {
      let category = new Category({ name: 'valid_name' })
      expect(() => category.update(null, null)).containsErrorMessages({
        name: errors
      })

      expect(() => category.update('', null)).containsErrorMessages({
        name: [errors[0]]
      })

      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [errors[1], errors[2]]
      })

      expect(() =>
        category.update('a'.repeat(256), null)
      ).containsErrorMessages({
        name: [errors[2]]
      })
    })

    it('should a invalid category using description property', () => {
      let category = new Category({ name: 'valid_name' })
      expect(() => category.update(null, 5 as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    })

    it('should a valid category', () => {
      expect.assertions(0)
      const category = new Category({ name: 'valid_name' })
      category.update('name_updated', null)
      category.update('name_updated', 'description_updated')
    })
  })
})
