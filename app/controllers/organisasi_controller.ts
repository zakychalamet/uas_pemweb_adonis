import type { HttpContext } from '@adonisjs/core/http'
import Organisasi from '#models/organisasi'
import {
  createOrganisasiValidator,
  updateOrganisasiValidator,
} from '#validators/organisasi'

export default class OrganisasiController {
  /**
   * Menampilkan semua data organisasi
   */
  async index({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    return view.render('organisasi/index', { organisasis })
  }

  /**
   * Menampilkan form tambah data
   */
  async create({ view }: HttpContext) {
    return view.render('organisasi/create')
  }

  /**
   * Menyimpan data baru
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createOrganisasiValidator)
      await Organisasi.create(data)
      session.flash('success', 'Data organisasi berhasil disimpan')
      return response.redirect().toRoute('organisasi.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          namaOrganisasi: request.input('namaOrganisasi'),
          jenis: request.input('jenis')
        })
      } else {
        session.flash('error', `Terjadi kesalahan saat menyimpan data: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan form edit
   */
  async edit({ params, view }: HttpContext) {
    const organisasi = await Organisasi.findOrFail(params.id)
    return view.render('organisasi/edit', { organisasi })
  }

  /**
   * Menyimpan update data
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const organisasi = await Organisasi.findOrFail(params.id)
      const data = await request.validateUsing(updateOrganisasiValidator)

      organisasi.merge(data)
      await organisasi.save()
      
      session.flash('success', 'Data organisasi berhasil diperbarui')
      return response.redirect().toRoute('organisasi.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          namaOrganisasi: request.input('namaOrganisasi'),
          jenis: request.input('jenis')
        })
      } else {
        session.flash('error', `Gagal memperbarui data: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const organisasi = await Organisasi.findOrFail(params.id)
      await organisasi.delete()
      session.flash('success', 'Data organisasi berhasil dihapus')
    } catch (error) {
      session.flash('error', `Gagal menghapus data: ${error.message}`)
    }

    return response.redirect().toRoute('organisasi.index')
  }

}
