import type { HttpContext } from '@adonisjs/core/http'
import Kegiatan from '#models/kegiatan'
import Organisasi from '#models/organisasi'
import Lokasi from '#models/lokasi'
import Kepanitiaan from '#models/kepanitiaan'

export default class LaporanController {
  /**
   * Menampilkan halaman laporan
   */
  async index({ request, view }: HttpContext) {
    // Ambil parameter filter
    const organisasiId = request.input('organisasiId')
    const lokasiId = request.input('lokasiId')

    // Ambil semua organisasi dan lokasi untuk filter dropdown
    const organisasis = await Organisasi.all()
    const lokasis = await Lokasi.all()

    // Buat query kegiatan
    let kegiatanQuery = Kegiatan.query()
      .preload('organisasi')
      .preload('lokasi')

    // Tambahkan filter jika ada
    if (organisasiId) {
      kegiatanQuery = kegiatanQuery.where('organisasi_id', organisasiId)
    }

    if (lokasiId) {
      kegiatanQuery = kegiatanQuery.where('lokasi_id', lokasiId)
    }

    // Eksekusi query kegiatan
    const kegiatans = await kegiatanQuery.exec()

    // Dapatkan data laporan dan jumlah panitia per kegiatan
    const laporanData = await Promise.all(
      kegiatans.map(async (kegiatan) => {
        const panitiaCount = await Kepanitiaan.query()
          .where('kegiatan_id', kegiatan.id)
          .count('* as total')

        return {
          kegiatan,
          jumlahPanitia: Number(panitiaCount[0].$extras.total),
        }
      })
    )

    // Hitung total kegiatan dan total panitia
    const totalKegiatan = laporanData.length
    const totalPanitia = laporanData.reduce((sum, item) => sum + item.jumlahPanitia, 0)

    // Kirim ke view
    return view.render('laporan/index', {
      laporanData,
      organisasis,
      lokasis,
      totalKegiatan,
      totalPanitia,
      selectedOrganisasiId: organisasiId,
      selectedLokasiId: lokasiId,
    })
  }
}
