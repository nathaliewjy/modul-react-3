// import { lazy, StrictMode, Suspense } from 'react' // Tambahkan Suspense
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route } from 'react-router' // Versi 7 pakai react-router saja

// // Import Lazy (Pastikan path-nya benar, biasanya pake ./ namofile)
// const LearningHookPage = lazy(() => import('./LearningHooks'))
// const PostPage = lazy(() => import('./PostList'))
// const PostDetailPage = lazy(() => import('./PostDetail'))

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       {/* lazy load WAJIB dibungkus Suspense agar tidak error saat loading */}
//       <Suspense fallback={<div>Loading Page...</div>}>
//         <Routes>
//           <Route path="/learning-hooks" element={<LearningHookPage />} />
//           <Route path="/post" element={<PostPage />} />
//           <Route path="/post/:id" element={<PostDetailPage />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   </StrictMode>
// )

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './config/AppRoutes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Layout } from './components/Layout'


const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined'
      }
    },
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)

