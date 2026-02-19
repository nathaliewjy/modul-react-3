import { Box, Container, Grid, Paper, Stack, Button } from "@mui/material"
import { useEffect, useState, useMemo } from "react"
import type { Post, PostListResponse } from "../../types"
import { Title } from "../../components/Title"
import { PostListPageCard } from "./PostListPageCard"
import { PostListPageSekeletonCard } from "./PostListPageSkeletonCard"
import { wait } from "../../utils/wait"
import { Link } from "react-router-dom" // Pastikan react-router-dom

export default function PostListPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("createdAt")
    const [isSortAscending, setIsSortAscending] = useState(true)

    async function reloadPosts() {
        setIsLoading(true)
        try {
            const response = await fetch('/api/post')
            await wait(1000) // 3 detik kelamaan, 1 detik saja cukup buat tes
            if (!response.ok) return
            const data = await response.json() as PostListResponse
            setPosts(data.records)
        } catch (error) {
            console.error("Gagal load post", error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        reloadPosts()
    }, [])

    // 1. LOGIC FILTER & SORT (useMemo berhenti di sini)
    const displayPosts = useMemo(() => {
        let filtered = posts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.user.name.toLowerCase().includes(search.toLowerCase())
        )

        return filtered.sort((a, b) => {
            let fieldA: string = ""
            let fieldB: string = ""

            if (sortBy === 'title') {
                fieldA = a.title; fieldB = b.title
            } else if (sortBy === 'userName') {
                fieldA = a.user.name; fieldB = b.user.name
            } else {
                fieldA = a.createdAt; fieldB = b.createdAt
            }

            const multiplier = isSortAscending ? 1 : -1
            return fieldA.localeCompare(fieldB) * multiplier
        })
    }, [posts, search, sortBy, isSortAscending])

    // 2. FUNGSI DELETE (Berdiri sendiri, bukan di dalam useMemo)
    const handleDelete = async (id: string) => {
        if (!window.confirm("Yakin ingin menghapus post ini?")) return

        const token = localStorage.getItem("authenticationToken") || localStorage.getItem("token")
        const response = await fetch(`/api/post/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok) {
            reloadPosts()
        } else {
            alert("Gagal menghapus post")
        }
    }

    // 3. TAMPILAN UI
    return (
        <Container>
            <Box justifyContent='center' display='flex' mb={3}>
                <Title>Forum Feed</Title>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="center" justifyContent="center">
                <input
                    placeholder="Cari judul atau user..."
                    style={{ padding: '10px 20px', borderRadius: '20px', width: '300px', border: '1px solid #ccc' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Box display="flex" gap={1}>
                    <Button variant="outlined" size="small" onClick={() => { setSortBy('title'); setIsSortAscending(!isSortAscending); }}>
                        Title {sortBy === 'title' ? (isSortAscending ? '↑' : '↓') : ''}
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => { setSortBy('userName'); setIsSortAscending(!isSortAscending); }}>
                        User {sortBy === 'userName' ? (isSortAscending ? '↑' : '↓') : ''}
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => { setSortBy('createdAt'); setIsSortAscending(!isSortAscending); }}>
                        Date {sortBy === 'createdAt' ? (isSortAscending ? '↑' : '↓') : ''}
                    </Button>
                </Box>

                <Link to="/post/create" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Add Post</Button>
                </Link>
            </Stack>

            <Box py={2}>
                <Paper sx={{ p: 2 }}>
                    <Stack gap={2}>
                        {isLoading && (
                            <Grid container spacing={2}>
                                {[1, 2, 3].map((i) => (
                                    <Grid key={i} size={{ md: 4 }}>
                                        <PostListPageSekeletonCard />
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {!isLoading && (
                            <Grid container spacing={2}>
                                {displayPosts.map(record => (
                                    <Grid key={record.id} size={{ md: 4 }}>
                                        <PostListPageCard post={record} onDelete={handleDelete} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
}