import type { HttpContext } from '@adonisjs/core/http'
import Anggota from '#models/anggota'
import Organisasi from '#models/organisasi'
import {
  createAnggotaValidator,
  updateAnggotaValidator,
} from '#validators/anggota'

export default class AnggotaController {
  /**
   * Menampilkan semua data anggota
   */
  async index({ view }: HttpContext) {
    const anggotas = await Anggota.query().preload('organisasi')
    return view.render('anggota/index', { anggotas })
  }

  /**
   * Menampilkan form tambah anggota
   */
  async create({ view }: HttpContext) {
    const organisasis = await Organisasi.all()
    return view.render('anggota/create', { organisasis })
  }

  /**
   * Menyimpan data anggota baru
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createAnggotaValidator)
      await Anggota.create(data)
      session.flash('success', 'Data anggota berhasil ditambahkan')
      return response.redirect().toRoute('anggota.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          nama: request.input('nama'),
          nim: request.input('nim'),
          organisasiId: request.input('organisasiId')
        })
      } else {
        session.flash('error', `Gagal menyimpan data anggota: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan form edit anggota
   */
  async edit({ params, view }: HttpContext) {
    const anggota = await Anggota.findOrFail(params.id)
    const organisasis = await Organisasi.all()
    return view.render('anggota/edit', { anggota, organisasis })
  }

  /**
   * Memperbarui data anggota
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const anggota = await Anggota.findOrFail(params.id)
      const data = await request.validateUsing(updateAnggotaValidator)

      anggota.merge(data)
      await anggota.save()
      session.flash('success', 'Data anggota berhasil diperbarui')
      return response.redirect().toRoute('anggota.index')
    } catch (error) {
      if (error.messages) {
        // Validation errors
        session.flash('errors', error.messages)
        session.flash('old', {
          nama: request.input('nama'),
          nim: request.input('nim'),
          organisasiId: request.input('organisasiId')
        })
      } else {
        session.flash('error', `Gagal memperbarui data anggota: ${error.message}`)
      }
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data anggota
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const anggota = await Anggota.findOrFail(params.id)
      await anggota.delete()
      session.flash('success', 'Data anggota berhasil dihapus')
    } catch (error) {
      session.flash('error', `Gagal menghapus data anggota: ${error.message}`)
    }

    return response.redirect().toRoute('anggota.index')
  }
}
