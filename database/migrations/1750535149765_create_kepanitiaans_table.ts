import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kepanitiaan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('kegiatan_id')
        .unsigned()
        .references('id')
        .inTable('kegiatan')
        .onDelete('CASCADE')

      table
        .integer('anggota_id')
        .unsigned()
        .references('id')
        .inTable('anggota')
        .onDelete('CASCADE')

      table.string('jabatan', 100).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['kegiatan_id', 'anggota_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}