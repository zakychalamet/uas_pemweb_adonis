import vine from '@vinejs/vine'

/**
 * Validator untuk membuat data organisasi
 */
export const createOrganisasiValidator = vine.compile(
  vine.object({
    namaOrganisasi: vine.string().trim().minLength(3).maxLength(100),
    jenis: vine.string().trim().minLength(3).maxLength(100),
  })
)

/**
 * Validator untuk memperbarui data organisasi
 */
export const updateOrganisasiValidator = vine.compile(
  vine.object({
    namaOrganisasi: vine.string().trim().minLength(3).maxLength(100),
    jenis: vine.string().trim().minLength(3).maxLength(100),
  })
)
