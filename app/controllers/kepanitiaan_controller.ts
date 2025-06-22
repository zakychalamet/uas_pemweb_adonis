import type { HttpContext } from '@adonisjs/core/http'
import Kepanitiaan from '#models/kepanitiaan'
import Kegiatan from '#models/kegiatan'
import Anggota from '#models/anggota'
import {
  createKepanitiaanValidator,
  updateKepanitiaanValidator,
} from '#validators/kepanitiaan'

export default class KepanitiaanController {
  /**
   * Menampilkan semua data kepanitiaan
   */
  async index({ view }: HttpContext) {
    const kepanitiaans = await Kepanitiaan.query()
      .preload('kegiatan')
      .preload('anggota')

    return view.render('kepanitiaan/index', { kepanitiaans })
  }

  /**
   * Menampilkan form tambah kepanitiaan
   */
  async create({ view }: HttpContext) {
    const kegiatans = await Kegiatan.all()
    const anggotas = await Anggota.all()
    return view.render('kepanitiaan/create', { kegiatans, anggotas })
  }

  /**
   * Menyimpan data kepanitiaan baru
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createKepanitiaanValidator)
      await Kepanitiaan.create(data)
      session.flash('success', 'Data kepanitiaan berhasil ditambahkan')
      return response.redirect().toRoute('kepanitiaan.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          anggotaId: request.input('anggotaId'),
          kegiatanId: request.input('kegiatanId'),
          jabatan: request.input('jabatan')
        })
      } else {
        session.flash('error', `Gagal menyimpan data kepanitiaan: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan form edit kepanitiaan
   */
  async edit({ params, view }: HttpContext) {
    const kepanitiaan = await Kepanitiaan.findOrFail(params.id)
    const kegiatans = await Kegiatan.all()
    const anggotas = await Anggota.all()
    return view.render('kepanitiaan/edit', { kepanitiaan, kegiatans, anggotas })
  }

  /**
   * Memperbarui data kepanitiaan
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const kepanitiaan = await Kepanitiaan.findOrFail(params.id)
      const data = await request.validateUsing(updateKepanitiaanValidator)

      kepanitiaan.merge(data)
      await kepanitiaan.save()
      session.flash('success', 'Data kepanitiaan berhasil diperbarui')
      return response.redirect().toRoute('kepanitiaan.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          anggotaId: request.input('anggotaId'),
          kegiatanId: request.input('kegiatanId'),
          jabatan: request.input('jabatan')
        })
      } else {
        session.flash('error', `Gagal memperbarui data kepanitiaan: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data kepanitiaan
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const kepanitiaan = await Kepanitiaan.findOrFail(params.id)
      await kepanitiaan.delete()
      session.flash('success', 'Data kepanitiaan berhasil dihapus')
    } catch (error) {
      session.flash('error', `Gagal menghapus data kepanitiaan: ${error.message}`)
    }

    return response.redirect().toRoute('kepanitiaan.index')
  }
}
