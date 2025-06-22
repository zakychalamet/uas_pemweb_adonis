import type { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'
import {
  createLokasiValidator,
  updateLokasiValidator,
} from '#validators/lokasi'

export default class LokasiController {
  /**
   * Menampilkan semua data lokasi
   */
  async index({ view }: HttpContext) {
    const lokasis = await Lokasi.all()
    return view.render('lokasi/index', { lokasis })
  }

  /**
   * Menampilkan form tambah lokasi
   */
  async create({ view }: HttpContext) {
    return view.render('lokasi/create')
  }

  /**
   * Simpan data lokasi baru
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createLokasiValidator)
      await Lokasi.create(data)
      session.flash('success', 'Data lokasi berhasil ditambahkan')
      return response.redirect().toRoute('lokasi.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          namaLokasi: request.input('namaLokasi'),
          alamat: request.input('alamat')
        })
      } else {
        session.flash('error', `Terjadi kesalahan saat menyimpan lokasi: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Tampilkan form edit lokasi
   */
  async edit({ params, view }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    return view.render('lokasi/edit', { lokasi })
  }

  /**
   * Update data lokasi
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const lokasi = await Lokasi.findOrFail(params.id)
      const data = await request.validateUsing(updateLokasiValidator)

      lokasi.merge(data)
      await lokasi.save()
      session.flash('success', 'Data lokasi berhasil diperbarui')
      return response.redirect().toRoute('lokasi.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          namaLokasi: request.input('namaLokasi'),
          alamat: request.input('alamat')
        })
      } else {
        session.flash('error', `Gagal memperbarui data lokasi: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Hapus data lokasi
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const lokasi = await Lokasi.findOrFail(params.id)
      await lokasi.delete()
      session.flash('success', 'Data lokasi berhasil dihapus')
    } catch (error) {
      session.flash('error', `Gagal menghapus data lokasi: ${error.message}`)
    }

    return response.redirect().toRoute('lokasi.index')
  }
}
