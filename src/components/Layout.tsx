// // import { Toolbar, AppBar, Button, Box, Stack } from "@mui/material"
// // import { type PropsWithChildren } from "react"
// // import { useAppSelector } from "../hooks/useAppSelector"
// // import { Link } from "react-router"

// // export function Layout(props: PropsWithChildren) {
// //   const userInfo = useAppSelector(state => state.auth.userInfo)

// //   return (
// //     <Stack>
// //       <AppBar position="static">
// //         <Toolbar>
// //           <Box display='flex' justifyContent="space-between" flexGrow={1}>
// //             <Box />
// //             <Box>
// //               {!userInfo && (
// //                 <Link to='/login'>
// //                   <Button sx={{ color: 'white' }}>Login</Button>
// //                 </Link>
// //               )}
// //               {userInfo && (
// //                 <Button sx={{ color: 'white' }}>{userInfo.name}</Button>
// //               )}
// //             </Box>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>
// //       <Box sx={{ p: 3 }}>
// //         {props.children}
// //       </Box>
// //     </Stack>
// //   )
// // }

// import { useEffect, type PropsWithChildren } from "react";
// import { useAppSelector } from "../hooks/useAppSelector";
// import { AppBar, Box, Stack, Toolbar, Button } from "@mui/material";
// import { Link } from "react-router-dom"
// import { useAppDispatch } from "../hooks/useAppDispatch";

// export function Layout(props: PropsWithChildren) {
//   const userInfo = useAppSelector(state => state.auth.userInfo)

//   // kata dosenku nambah ini
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     async function reloadSession() {
//       const token = localStorage.getItem("authenticationToken")

//       if (token) {
//         // get user info lagi
//         // dispatch lagi setuserinfo
//       }
//     },
//     reloadSession()
    
//   }, [])

//   return <Stack>
//     <AppBar position="static">
//       <Toolbar>
//         <Box display='flex' justifyContent='space-between' flexGrow={1}>
//           <Box />
//           <Box>
//             {!userInfo && <Link to='/login'><Button>Login</Button></Link>}
//           </Box>
//         </Box>
//       </Toolbar>
//     </AppBar>
//     {props.children}
//   </Stack>
// }


import { useEffect, type PropsWithChildren } from "react"
import { useAppSelector } from "../hooks/useAppSelector"
import { AppBar, Box, Stack, Toolbar, Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { authActions } from "../store/authSlice"

export function Layout(props: PropsWithChildren) {
  const userInfo = useAppSelector(state => state.auth.userInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function reloadSession() {
      // Sesuai nama key yang diminta dosenmu di LoginPage tadi
      const token = localStorage.getItem("authenticationToken")

      if (token && !userInfo) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            // Dispatch lagi sesuai data yang didapat
            dispatch(authActions.setUserInfo(userData))
          } else {
            // Jika token sudah tidak valid, hapus saja
            localStorage.removeItem("authenticationToken")
            localStorage.removeItem("token")
          }
        } catch (error) {
          console.error("Gagal reload session", error)
        }
      }
    }
    
    reloadSession()
  }, [dispatch, userInfo])

  const handleLogout = () => {
    localStorage.removeItem("authenticationToken")
    localStorage.removeItem("token")
    dispatch(authActions.setUserInfo(undefined))
    navigate("/login")
  }

  return (
    <Stack>
      <AppBar position="static">
        <Toolbar>
          <Box display='flex' justifyContent='space-between' alignItems="center" flexGrow={1}>
            {/* Logo atau Judul Aplikasi */}
            <Link to="/post" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>FORUM</Typography>
            </Link>

            <Box>
              {!userInfo ? (
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white' }}>Login</Button>
                </Link>
              ) : (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    Halo, <strong>{userInfo.name}</strong>
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={handleLogout}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Logout
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3 }}>
        {props.children}
      </Box>
    </Stack>
  )
}