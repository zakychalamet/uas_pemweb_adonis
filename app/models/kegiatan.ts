// app/Models/Kegiatan.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'

export default class Kegiatan extends BaseModel {
  public static table = 'kegiatan'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column.date({ columnName: 'tgl_pelaksanaan' })
  declare tglPelaksanaan: DateTime

  @column({ columnName: 'organisasi_id' })
  declare organisasiId: number

  @column({ columnName: 'lokasi_id' })
  declare lokasiId: number

  @belongsTo(() => Organisasi, {
    foreignKey: 'organisasiId',
  })
  declare organisasi: BelongsTo<typeof Organisasi>

  @belongsTo(() => Lokasi, {
    foreignKey: 'lokasiId',
  })
  declare lokasi: BelongsTo<typeof Lokasi>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
