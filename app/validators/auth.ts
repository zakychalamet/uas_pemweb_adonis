import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2),
    email: vine.string().email(),
    password: vine.string().minLength(6).confirmed({
      confirmationField: 'passwordConfirmation',
    }),
    passwordConfirmation: vine.string(),
  })
)
