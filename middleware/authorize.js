import AuthPath from '@/constant/auth-path'

export default function ({ route, redirect, store }) {
  const needAuth = AuthPath.some((v) => v.test(route.path))
  if (needAuth) {
    if (!store.state.user.data?.token) {
      redirect('/login')
    }
  }
}
