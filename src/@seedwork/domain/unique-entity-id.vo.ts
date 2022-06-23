import { v4 as uuidv4, validate as uuidValidade } from 'uuid'
import InvalidUuidError from '../errors/invalid-uuid.error'

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuidv4()
    this.validate()
  }

  private validate(): void {
    const isValid = uuidValidade(this.id)
    if (!isValid) {
      throw new InvalidUuidError(this.id)
    }
  }
}
