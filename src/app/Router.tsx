import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import StoreLayout from '../layouts/StoreLayout'
import Loader from '../components/ui/Loader'

const HomePage = lazy(() =>
  import('../features/home/pages/HomePage')
)

const NotFoundPage = lazy(() =>
  import('../features/errors/pages/NotFoundPage')
)

function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter