/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Home page
router.get('/', async ({ view }) => {
  return view.render('pages/home')
}).as('home')

// Auth routes
import AuthController from '#controllers/auth_controller'
router.get('/login', [AuthController, 'showLogin']).as('auth.login')
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).as('auth.logout')
router.get('/register', [AuthController, 'showRegister']).as('auth.register')
router.post('/register', [AuthController, 'register'])

// Dashboard route
router.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
}).as('dashboard')

// Laporan route
import LaporanController from '#controllers/laporan_controller'
router.get('/laporan', [LaporanController, 'index']).as('laporan.index')

// Resource routes with proper naming
import OrganisasiController from '#controllers/organisasi_controller'
router.resource('organisasi', OrganisasiController).except(['show'])

import LokasiController from '#controllers/lokasi_controller'
router.resource('lokasi', LokasiController).except(['show'])

import KegiatanController from '#controllers/kegiatan_controller'
router.resource('kegiatan', KegiatanController).except(['show'])

import AnggotaController from '#controllers/anggota_controller'
router.resource('anggota', AnggotaController).except(['show'])

import KepanitiaanController from '#controllers/kepanitiaan_controller'
router.resource('kepanitiaan', KepanitiaanController).except(['show'])