// app/Models/Anggota.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organisasi from '#models/organisasi'

export default class Anggota extends BaseModel {
  public static table = 'anggota'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare nim: string

  @column({ columnName: 'organisasi_id' })
  declare organisasiId: number

  @belongsTo(() => Organisasi)
  declare organisasi: BelongsTo<typeof Organisasi>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
