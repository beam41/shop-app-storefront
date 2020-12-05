import AuthPath from '@/constants/auth-path'

export default function ({ route, redirect }) {
  const needAuth = AuthPath.some((v) => v.test(route.path))
  if (needAuth) {
    const storage = JSON.parse(localStorage.getItem('shop-app-storefront'))
    if (!storage.user.data?.token) {
      redirect('/login')
    }
  }
}
