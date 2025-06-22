import type { HttpContext } from '@adonisjs/core/http'

/**
 * Method override middleware
 * 
 * This middleware allows HTML forms to send PUT and DELETE requests
 * by using a hidden input field with name "_method"
 */
export default class MethodOverrideMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const method = ctx.request.input('_method')
    
    if (method && ['PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
      ctx.request.updateMethod(method.toUpperCase())
    }
    
    await next()
  }
} 