import vine from '@vinejs/vine'

/**
 * Validasi input untuk membuat lokasi baru
 */
export const createLokasiValidator = vine.compile(
  vine.object({
    namaLokasi: vine.string().trim().minLength(3).maxLength(100),
    alamat: vine.string().trim().minLength(5).maxLength(255),
  })
)

/**
 * Validasi input untuk memperbarui lokasi
 */
export const updateLokasiValidator = vine.compile(
  vine.object({
    namaLokasi: vine.string().trim().minLength(3).maxLength(100),
    alamat: vine.string().trim().minLength(5).maxLength(255),
  })
)
