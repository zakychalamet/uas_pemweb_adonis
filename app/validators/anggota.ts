import vine from '@vinejs/vine'

export const createAnggotaValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(100),
    nim: vine.string().trim().minLength(8).maxLength(20),
    organisasiId: vine.number().positive().transform((value) => Number(value)),
  })
)

export const updateAnggotaValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(100),
    nim: vine.string().trim().minLength(8).maxLength(20),
    organisasiId: vine.number().positive().transform((value) => Number(value)),
  })
)
