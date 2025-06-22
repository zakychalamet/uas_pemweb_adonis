import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anggota'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.string('nim', 20).notNullable().unique()

      table
        .integer('organisasi_id')
        .unsigned()
        .references('id')
        .inTable('organisasi')
        .onDelete('CASCADE')
        
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}