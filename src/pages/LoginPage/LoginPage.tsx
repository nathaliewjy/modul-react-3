// // import { useState } from "react"
// // import {
// //   Container,
// //   Box,
// //   TextField,
// //   Button,
// //   Typography,
// //   Paper,
// //   Alert,
// // } from "@mui/material"

// // import { useAppDispatch } from "../../hooks/useAppDispatch"
// // import { authActions } from "../../store/authSlice"
// // import { useNavigate } from "react-router-dom"
// // import type { UserInfo } from "../../types"

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [error, setError] = useState("")

// //   const dispatch = useAppDispatch()
// //   const navigate = useNavigate()

// //   async function handleLogin(e: React.FormEvent) {
// //     e.preventDefault()
// //     setError("")

// //     try {
// //       // 1) LOGIN
// //       const response = await fetch("/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       })

// //       if (!response.ok) {
// //         setError("Login gagal. Email atau password salah.")
// //         return
// //       }

// //       const loginData = await response.json()

// //       // 2) SIMPAN TOKEN
// //       localStorage.setItem("token", loginData.accessToken)

// //       // 3) AMBIL USER INFO
// //       const meResponse = await fetch("/api/auth/me", {
// //         headers: {
// //           Authorization: `Bearer ${loginData.accessToken}`,
// //         },
// //       })

// //       if (!meResponse.ok) {
// //         setError("Gagal mengambil data user.")
// //         return
// //       }

// //       const userInfo = (await meResponse.json()) as UserInfo

// //       // 4) DISPATCH KE REDUX
// //       dispatch(authActions.setUserInfo(userInfo))

// //       // 5) REDIRECT
// //       navigate("/post")
// //     } catch {
// //       setError("Terjadi error saat login.")
// //     }
// //   }

// //   return (
// //     <Container maxWidth="xs">
// //       <Box sx={{ mt: 10 }}>
// //         <Paper sx={{ p: 4 }}>
// //           <Typography variant="h5" textAlign="center" gutterBottom>
// //             LOGIN
// //           </Typography>

// //           {error && (
// //             <Alert severity="error" sx={{ mb: 2 }}>
// //               {error}
// //             </Alert>
// //           )}

// //           <Box component="form" onSubmit={handleLogin}>
// //             <TextField
// //               fullWidth
// //               margin="normal"
// //               label="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //             />

// //             <TextField
// //               fullWidth
// //               margin="normal"
// //               label="Password"
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />

// //             <Button
// //               type="submit"
// //               fullWidth
// //               variant="contained"
// //               sx={{ mt: 3 }}
// //             >
// //               Sign In
// //             </Button>
// //           </Box>
// //         </Paper>
// //       </Box>
// //     </Container>
// //   )
// // }

// import { useState } from "react"
// import { Container, Box, TextField, Button, Typography, Paper, Alert } from "@mui/material"
// import { useAppDispatch } from "../../hooks/useAppDispatch"
// import { authActions } from "../../store/authSlice"
// import { useNavigate } from "react-router"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()

//   // kata dosenku nambah ini
//   const login = async () => {
//     if (!isEmail(email)) {
//       alert("Email salah")
//       return
//     }
//   }

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()
//     setError("")

//     // 1. Ambil Token
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       localStorage.setItem("token", data.accessToken)

//       // 2. Ambil Data User (KARENA DI LOGIN GAK ADA DATA USERNYA)
//       const meResponse = await fetch("/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${data.accessToken}`,
//         },
//       })

//       if (meResponse.ok) {
//         const userData = await meResponse.json()

//         // DEBUG: Cek apakah userData punya field 'id'
//         console.log("Data dari /me:", userData)

//         // Pastikan yang di-dispatch adalah object yang berisi 'id'
//         dispatch(authActions.setUserInfo(userData.user))
//         localStorage.set("authenticationToken",token) // sama nambah ini

//         navigate("/post")
//       }
//     } else {
//       setError(data.message || "Login gagal.")
//     }
//   }

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ mt: 10 }}>
//         <Paper sx={{ p: 4 }}>
//           <Typography variant="h5" textAlign="center" gutterBottom>LOGIN</Typography>
//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//           <Box component="form" onSubmit={handleLogin}>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
//               Sign In
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   )
// }


import { useState } from "react"
import { Container, Box, TextField, Button, Typography, Paper, Alert } from "@mui/material"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { authActions } from "../../store/authSlice"
import { useNavigate } from "react-router"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Fungsi helper untuk validasi email (agar isEmail tidak merah)
  const isEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Tambahan validasi dari dosen
    if (!isEmail(email)) {
      alert("Format email salah")
      return
    }

    try {
      // 1. Ambil Token
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Simpan token (pakai accessToken sesuai response API kamu)
        localStorage.setItem("token", data.accessToken)
        // Tambahan dari dosen (pastikan variabel 'token' diambil dari data.accessToken)
        localStorage.setItem("authenticationToken", data.accessToken)

        // 2. Ambil Data User
        const meResponse = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        })

        if (meResponse.ok) {
          const userData = await meResponse.json()

          console.log("Data dari /me:", userData)

          // PERHATIKAN DISINI: 
          // Jika di console 'userData' langsung punya 'id', gunakan 'userData'.
          // Jika 'id' ada di dalam 'userData.user', baru gunakan 'userData.user'.
          // Berdasarkan error kamu sebelumnya, coba kirim userData langsung:
          dispatch(authActions.setUserInfo(userData.user))

          navigate("/post")
        }
      } else {
        setError(data.message || "Login gagal.")
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.")
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>LOGIN</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}