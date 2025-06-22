import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'

export default class Kepanitiaan extends BaseModel {
  public static table = 'kepanitiaan'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'kegiatan_id' })
  declare kegiatanId: number

  @column({ columnName: 'anggota_id' })
  declare anggotaId: number

  @column()
  declare jabatan: string

  @belongsTo(() => Kegiatan)
  declare kegiatan: BelongsTo<typeof Kegiatan>

  @belongsTo(() => Anggota)
  declare anggota: BelongsTo<typeof Anggota>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
