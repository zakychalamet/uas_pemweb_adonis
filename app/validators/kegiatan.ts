import vine from '@vinejs/vine'

export const createKegiatanValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(100),
    tglPelaksanaan: vine.date(),
    organisasiId: vine.number().positive(),
    lokasiId: vine.number().positive(),
  })
)

export const updateKegiatanValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(100),
    tglPelaksanaan: vine.date(),
    organisasiId: vine.number().positive(),
    lokasiId: vine.number().positive(),
  })
)
