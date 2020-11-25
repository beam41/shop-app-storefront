import AuthPath from '@/constants/auth-path'

export default function ({ route, redirect }) {
  if (process.browser) {
    const needAuth = AuthPath.some((v) => v.test(route.path))
    const storage = JSON.parse(localStorage.getItem('shop-app-storefront'))
    if (needAuth) {
      if (!storage.user.data?.token) {
        redirect('/login')
      }
    }
  }
}
