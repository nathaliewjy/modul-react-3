import { useState, useEffect } from "react"
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material"
import { useNavigate, useParams } from "react-router"

export default function EditPostPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getPostDetail() {
            try {
                const response = await fetch(`/api/post/${id}`)
                if (!response.ok) throw new Error("Gagal mengambil data")
                
                const data = await response.json()

                // Sesuaikan dengan struktur API kamu
                // Biasanya data post dibungkus lagi atau langsung object
                // Kita asumsikan data langsung punya title dan content
                setTitle(data.title || "")
                setContent(data.content || "")
            } catch (err) {
                setError("Gagal memuat data postingan.")
            } finally {
                // PENTING: Matikan loading apapun hasilnya
                setIsLoading(false)
            }
        }
        getPostDetail()
    }, [id])

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        
        // Gunakan token yang konsisten (tadi kamu pakai authenticationToken di Layout)
        const token = localStorage.getItem("authenticationToken") || localStorage.getItem("token")

        try {
            const response = await fetch(`/api/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, status: "published" }),
            })

            if (response.ok) {
                navigate("/post")
            } else {
                const errData = await response.json()
                setError(errData.message || "Gagal mengupdate post.")
            }
        } catch {
            setError("Terjadi kesalahan jaringan.")
        }
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Memuat data...</Typography>
            </Box>
        )
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">Edit Post</Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleUpdate}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Content"
                            multiline
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 3, py: 1.5 }} fullWidth>
                            Simpan Perubahan
                        </Button>
                        <Button variant="text" sx={{ mt: 1 }} fullWidth onClick={() => navigate("/post")}>
                            Batal
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}