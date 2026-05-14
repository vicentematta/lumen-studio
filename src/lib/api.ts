export interface ApiResponse<T = null> {
  success: boolean
  data: T | null
  error: string | null
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

async function mockPost<T = null>(
  _path: string,
  _body: unknown,
): Promise<ApiResponse<T>> {
  await delay(800)
  return { success: true, data: null, error: null }
}

export const api = {
  login: (body: { email: string; password: string }) =>
    mockPost<{ token: string }>('/api/auth/login', body),

  signup: (body: { name: string; email: string; password: string }) =>
    mockPost<{ token: string }>('/api/auth/signup', body),

  contact: (body: {
    name: string
    email: string
    company?: string
    message: string
  }) => mockPost('/api/contact', body),
}
