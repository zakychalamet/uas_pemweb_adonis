import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Organisasi extends BaseModel {
  public static table = 'organisasi' 

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'nama_organisasi' })
  declare namaOrganisasi: string

  @column()
  declare jenis: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
