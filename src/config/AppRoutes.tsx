// import { lazy, Suspense } from "react"
// import { Routes, Route } from "react-router"
// import { useAppSelector } from "../hooks/useAppSelector"

// import { Routes } from 'react-router'
// import { useAppSelector } from '../hooks/useAppSelector'
// import LoginPage from '../pages/LoginPage/LoginPage'

// const LoginPage = lazy(() => import('../pages/LoginPage'))
// const PostListPage = lazy(() => import('../PostList'))
// const PostDetailPage = lazy(() => import('../PostDetail'))

// export const AppRoutes = () => {
//   const { isLoading, userInfo } = useAppSelector(state => state.auth)

//   if (isLoading) {
//     return null
//   }

//   return (
//     <Suspense fallback={null}>
//       <Routes>
//         <Route path='/post' element={<PostListPage />} />
//         <Route path='/post/:id' element={<PostDetailPage />} />
//         {!userInfo && <Route path='/login' element={<LoginPage />} />}
//       </Routes>
//     </Suspense>
//   )
// }



// import { lazy } from "react"
// import { Routes, Route } from "react-router-dom"
// import { useAppSelector } from "../hooks/useAppSelector"

// const HomePage = lazy(() => import("../pages/HomePage"))
// const PostListPage = lazy(() =>
//   import("../pages/PostListPage/PostListPage")
// )
// const PostDetailPage = lazy(() =>
//   import("../pages/PostDetailPage/PostDetailPage")
// )
// const CreatePostPage = lazy(() =>
//   import("../pages/CreatePostPage/CreatePostPage")
// )
// const LoginPage = lazy(() =>
//   import("../pages/LoginPage/LoginPage")
// )

// export const AppRoutes = () => {
//   const { isLoading, userInfo } = useAppSelector(state => state.auth)

//   // kalau masih loading, tunggu dulu
//   if (isLoading) {
//     return null
//   }

//   // kalau belum login, arahkan ke login page
//   if (!userInfo) {
//     return (
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="*" element={<LoginPage />} />
//       </Routes>
//     )
//   }

//   // kalau sudah login, baru boleh akses semua halaman
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/post" element={<PostListPage />} />
//       <Route path="/post/create" element={<CreatePostPage />} />
//       <Route path="/post/:id" element={<PostDetailPage />} />
//     </Routes>
//   )
// }



import { lazy, Suspense, useEffect } from "react" // Tambahkan useEffect di sini
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch" // Ini sudah benar
import { authActions } from "../store/authSlice"
import LoginPage from "../pages/LoginPage/LoginPage"

const HomePage = lazy(() => import("../pages/HomePage"))
const PostListPage = lazy(() => import("../pages/PostListPage/PostListPage"))
const PostDetailPage = lazy(() => import("../pages/PostDetailPage/PostDetailPage"))
const CreatePostPage = lazy(() => import("../pages/CreatePostPage/CreatePostPage"))
const EditPostPage = lazy(() => import("../pages/EditPostPage/EditPostPage"))

export const AppRoutes = () => {
  const { isLoading, userInfo } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch() // Tambahkan baris ini!

  useEffect(() => {
    async function reAuth() {
      const token = localStorage.getItem("token")

      // Jika ada token di storage tapi Redux kosong (karena refresh)
      if (token && !userInfo) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          })
          
          if (response.ok) {
            const userData = await response.json()
            // Isi kembali Redux-nya
            dispatch(authActions.setUserInfo(userData.user))
          } else {
            // Kalau token ternyata sudah mati (expired), hapus dari storage
            localStorage.removeItem("token")
          }
        } catch (error) {
          console.error("Re-auth failed", error)
        }
      }
    }
    reAuth()
  }, [dispatch, userInfo])

  if (isLoading) return null

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {!userInfo ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostListPage />} />
            <Route path="/post/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/post/edit/:id" element={<EditPostPage />} />
            <Route path="*" element={<Navigate to="/post" />} />
          </>
        )}
      </Routes>
    </Suspense>
  )
}
