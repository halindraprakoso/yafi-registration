import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const zodText = z
  .string({
    required_error: 'Input ini diperlukan',
    invalid_type_error: 'Input ini diperlukan',
  })
  .toUpperCase()
  .trim()

export const zodEnum = (options: [string, ...string[]]) =>
  z.enum(options, {
    required_error: 'Input ini diperlukan',
    invalid_type_error: 'Input ini diperlukan',
  })

export const zodDate = z.date({
  required_error: 'Input ini diperlukan',
  invalid_type_error: 'Input ini diperlukan',
})

export function getSearchParams<T extends string>(request: Request, params: T[]): { [K in T]: string | null } {
  const url = new URL(request.url)
  const searchParams: { [K in T]?: string | null } = {}

  for (const param of params) {
    searchParams[param] = url.searchParams.get(param)
  }

  return searchParams as { [x in T]: string | null }
}
