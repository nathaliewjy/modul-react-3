import { Box, Container, Grid, Paper, Stack, Button } from "@mui/material"
import { useEffect, useState, useMemo } from "react"
import type { Post, PostListResponse } from "../../types"
import { Title } from "../../components/Title"
import { PostListPageCard } from "./PostListPageCard"
import { PostListPageSekeletonCard } from "./PostListPageSkeletonCard"
import { wait } from "../../utils/wait"
import { Link } from "react-router"


export default function PostListPage() {
    const [posts, setPosts] = useState<Post[]>([])
    // const [postInfo, setPostInfo] = useState<PostListResponse['info']>({ count: 0 })
    const [isLoading, setIsLoading] = useState(false)
    // const [hasError, setHasError] = useState(false)

    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("createdAt")
    const [isSortAscending, setIsSortAscending] = useState(true)

    async function reloadPosts() {

        // setHasError(false)
        setIsLoading(true)
        try {
            const response = await fetch('/api/post')
            await wait(3000) // biar keliatan skeletonnya
            if (!response.ok) {
                // setHasError(true)
                return
            }
            const data = await response.json() as PostListResponse
            setPosts(data.records)
            // setPostInfo(data.info)
        } catch {
            // setHasError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {

        reloadPosts()
    }, [])

    const displayPosts = useMemo(() => {
        // 1. Filter berdasarkan search
        let filtered = posts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.user.name.toLowerCase().includes(search.toLowerCase())
        )

        // 2. Sort data
        return filtered.sort((a, b) => {
            let fieldA: string, fieldB: string
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

    const handleDelete = async (id: string) => {
        if (!window.confirm("Yakin ingin menghapus post ini?")) return

        const token = localStorage.getItem("token")
        const response = await fetch(`/api/post/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok) {
            // Panggil reload agar list post terupdate tanpa refresh halaman
            reloadPosts()
        } else {
            alert("Gagal menghapus post")
        }
    }

    return <Container>
        <Box justifyContent='center' display='flex'>
            <Title>Posts</Title>
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

        <Box display="flex" justifyContent="flex-end">
            <Link to="/post/create">
                <Button>
                    Add Post
                </Button>
            </Link>
        </Box>

        <Box py={2}>
            <Paper>
                <Stack p={2} gap={2}>
                    <Box justifyContent='center' display='flex'>
                        <Title>Posts</Title>
                    </Box>
                    {isLoading && <Grid container spacing={2}>
                        <Grid size={{ md: 4 }}>
                            <PostListPageSekeletonCard />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <PostListPageSekeletonCard />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <PostListPageSekeletonCard />
                        </Grid>
                    </Grid>}
                    <Grid container spacing={2}>
                        {posts.map(record =>
                            <Grid key={record.id} size={{ md: 4 }}>
                                <PostListPageCard post={record} onDelete={handleDelete} />
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </Paper>
        </Box>
    </Container>
}
