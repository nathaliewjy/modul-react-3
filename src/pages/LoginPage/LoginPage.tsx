// import { useState } from "react"
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Alert,
// } from "@mui/material"

// import { useAppDispatch } from "../../hooks/useAppDispatch"
// import { authActions } from "../../store/authSlice"
// import { useNavigate } from "react-router-dom"
// import type { UserInfo } from "../../types"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()
//     setError("")

//     try {
//       // 1) LOGIN
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!response.ok) {
//         setError("Login gagal. Email atau password salah.")
//         return
//       }

//       const loginData = await response.json()

//       // 2) SIMPAN TOKEN
//       localStorage.setItem("token", loginData.accessToken)

//       // 3) AMBIL USER INFO
//       const meResponse = await fetch("/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${loginData.accessToken}`,
//         },
//       })

//       if (!meResponse.ok) {
//         setError("Gagal mengambil data user.")
//         return
//       }

//       const userInfo = (await meResponse.json()) as UserInfo

//       // 4) DISPATCH KE REDUX
//       dispatch(authActions.setUserInfo(userInfo))

//       // 5) REDIRECT
//       navigate("/post")
//     } catch {
//       setError("Terjadi error saat login.")
//     }
//   }

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ mt: 10 }}>
//         <Paper sx={{ p: 4 }}>
//           <Typography variant="h5" textAlign="center" gutterBottom>
//             LOGIN
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

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

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3 }}
//             >
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // 1. Ambil Token
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.accessToken)

      // 2. Ambil Data User (KARENA DI LOGIN GAK ADA DATA USERNYA)
      const meResponse = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })

      if (meResponse.ok) {
        const userData = await meResponse.json()

        // 3. Simpan ke Redux (userData hasil dari /api/auth/me)
        dispatch(authActions.setUserInfo(userData))

        // 4. Baru pindah halaman
        navigate("/post")
      } else {
        setError("Gagal mengambil profil user.")
      }
    } else {
      setError(data.message || "Login gagal.")
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>LOGIN</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
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