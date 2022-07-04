import InvalidUuidError from '../../errors/invalid-uuid.error'
import UniqueEntityId from '../unique-entity-id.vo'
import { validate as uuidValidade } from 'uuid'

// const spyValidateMethod = () => {
//   return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
// }
describe('UniqueEntityId Unit Tests', () => {

  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
  // beforeEach(() => {
  //   validateSpy.mockClear()
  // })

  it('should throw error when uuid is invalid', () => {
    // const validateSpy = spyValidateMethod()
    expect(() => new UniqueEntityId('invalid-uuid')).toThrow(new InvalidUuidError('invalid-uuid'))
    expect(validateSpy).toHaveBeenCalled()
  })
  
  it('should accept a uuid passed in constructor', () => {
    // const validateSpy = spyValidateMethod()
    const id = 'a0ece5db-cd14-4f21-812f-966d1d6cf919'
    const vo = new UniqueEntityId(id)
    expect(vo.value).toBe(id)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    // const validateSpy = spyValidateMethod()
    const vo = new UniqueEntityId()
    expect(uuidValidade(vo.value)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})
