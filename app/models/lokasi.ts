import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Lokasi extends BaseModel {
  public static table = 'lokasi'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'nama_lokasi' })
  declare namaLokasi: string

  @column()
  declare alamat: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
