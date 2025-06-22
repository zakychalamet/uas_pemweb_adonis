import vine from '@vinejs/vine'

export const createKepanitiaanValidator = vine.compile(
  vine.object({
    kegiatanId: vine.number().positive(),
    anggotaId: vine.number().positive(),
    jabatan: vine.string().trim().minLength(3).maxLength(100),
  })
)

export const updateKepanitiaanValidator = vine.compile(
  vine.object({
    kegiatanId: vine.number().positive(),
    anggotaId: vine.number().positive(),
    jabatan: vine.string().trim().minLength(3).maxLength(100),
  })
)
