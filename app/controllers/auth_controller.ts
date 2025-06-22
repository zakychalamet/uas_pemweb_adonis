import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  /**
   * Tampilkan halaman login
   */
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  /**
   * Proses login
   */
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      session.flash('success', 'Berhasil login')
      return response.redirect().toRoute('dashboard')
    } catch {
      session.flash('errors', {
        login: 'Email atau password tidak valid',
      })
      return response.redirect().back()
    }
  }

  /**
   * Logout user
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Anda telah logout')
    return response.redirect().toRoute('auth.login')
  }

  /**
   * Tampilkan form registrasi
   */
  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  /**
   * Proses registrasi user baru
   */
  async register({ request, auth, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })

    await auth.use('web').login(user)
    session.flash('success', 'Akun berhasil dibuat!')
    return response.redirect().toRoute('dashboard')
  }
}
