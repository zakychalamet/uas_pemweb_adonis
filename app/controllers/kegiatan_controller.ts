import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import {
  createKegiatanValidator,
  updateKegiatanValidator,
} from '#validators/kegiatan'

export default class KegiatanController {
  /**
   * Menampilkan semua data kegiatan
   */
  async index({ view }: HttpContext) {
    const kegiatans = await Kegiatan.query()
      .preload('organisasi')
      .preload('lokasi')

    return view.render('kegiatan/index', { kegiatans })
  }

  /**
   * Menampilkan form tambah kegiatan
   */
  async create({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()

    return view.render('kegiatan/create', { organisasis, lokasis })
  }

  /**
   * Menyimpan data kegiatan
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createKegiatanValidator)
      
      // Check if organisasi and lokasi exist
      const organisasi = await Organisasi.find(data.organisasiId)
      const lokasi = await Lokasi.find(data.lokasiId)
      
      if (!organisasi) {
        session.flash('error', `Organisasi dengan ID ${data.organisasiId} tidak ditemukan`)
        return response.redirect().back()
      }
      
      if (!lokasi) {
        session.flash('error', `Lokasi dengan ID ${data.lokasiId} tidak ditemukan`)
        return response.redirect().back()
      }
      
      // Convert Date to DateTime
      const kegiatanData = {
        ...data,
        tglPelaksanaan: DateTime.fromJSDate(data.tglPelaksanaan)
      }
      
      await Kegiatan.create(kegiatanData)
      session.flash('success', 'Data kegiatan berhasil ditambahkan')
      return response.redirect().toRoute('kegiatan.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          nama: request.input('nama'),
          tglPelaksanaan: request.input('tglPelaksanaan'),
          organisasiId: request.input('organisasiId'),
          lokasiId: request.input('lokasiId')
        })
      } else {
        session.flash('error', `Terjadi kesalahan saat menyimpan data: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan form edit kegiatan
   */
  async edit({ params, view }: HttpContext) {
    const kegiatan = await Kegiatan.findOrFail(params.id)
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()

    return view.render('kegiatan/edit', {
      kegiatan,
      organisasis,
      lokasis,
    })
  }

  /**
   * Memperbarui data kegiatan
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      const data = await request.validateUsing(updateKegiatanValidator)

      // Convert Date to DateTime
      const updateData = {
        ...data,
        tglPelaksanaan: DateTime.fromJSDate(data.tglPelaksanaan)
      }

      kegiatan.merge(updateData)
      await kegiatan.save()
      session.flash('success', 'Data kegiatan berhasil diperbarui')
      return response.redirect().toRoute('kegiatan.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          nama: request.input('nama'),
          tglPelaksanaan: request.input('tglPelaksanaan'),
          organisasiId: request.input('organisasiId'),
          lokasiId: request.input('lokasiId')
        })
      } else {
        session.flash('error', `Gagal memperbarui data kegiatan: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data kegiatan
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const kegiatan = await Kegiatan.findOrFail(params.id)
      await kegiatan.delete()
      session.flash('success', 'Data kegiatan berhasil dihapus')
    } catch (error) {
      session.flash('error', `Gagal menghapus data kegiatan: ${error.message}`)
    }

    return response.redirect().toRoute('kegiatan.index')
  }
}
