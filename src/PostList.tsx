import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions,
    Avatar, IconButton, Typography, Container,
    Box, CircularProgress, Button
} from '@mui/material';
import { red, blue, green, orange, purple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';

type Post = {
    id: string;
    content: string;
    status: string;
    title: string;
    user: { name: string };
    createdAt: string;
}

function PostCardItem({ post }: { post: Post }) {
    const colors = [red[500], blue[500], green[500], orange[500], purple[500]];
    const avatarColor = colors[post.user.name.length % 5];

    return (
        <Card sx={{ height: '220px', display: 'flex', flexDirection: 'column', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: avatarColor }}>{post.user.name[0].toUpperCase()}</Avatar>}
                action={<IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>}
                title={<Typography variant="subtitle1" fontWeight="bold" noWrap>{post.title}</Typography>}
                subheader={<Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('id-ID')}</Typography>}
            />
            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pt: 0 }}>
                <Typography variant="body2" color="text.primary" sx={{
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: '1px solid #f0f0f0', justifyContent: 'space-between', py: 0.5 }}>
                <Box><IconButton size="small" color="error"><FavoriteIcon fontSize="small" /></IconButton></Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: post.status === 'published' ? 'green' : 'orange' }}>
                    {post.status.toUpperCase()}
                </Typography>
            </CardActions>
        </Card>
    );
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [isSortAscending, setIsSortAscending] = useState(true);
    
    const navigate = useNavigate();

    const reloadPosts = () => {
        setLoading(true);
        fetch('http://localhost:5173/api/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data.records || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    };

    const goToPost = (id: string) => {
        navigate(`/post/${id}`);
    };

    useEffect(() => {
        reloadPosts();
    }, []);

    const displayPosts = useMemo(() => {
        let result = posts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.user.name.toLowerCase().includes(search.toLowerCase())
        );

        return result.sort((a, b) => {
            let fieldA: string, fieldB: string;
            
            if (sortBy === 'title') {
                fieldA = a.title.toLowerCase(); fieldB = b.title.toLowerCase();
            } else if (sortBy === 'userName') {
                fieldA = a.user.name.toLowerCase(); fieldB = b.user.name.toLowerCase();
            } else {
                fieldA = a.createdAt; fieldB = b.createdAt;
            }

            const multiplier = isSortAscending ? 1 : -1;
            return fieldA.localeCompare(fieldB) * multiplier;
        });
    }, [posts, search, sortBy, isSortAscending]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 2 }}>
                <CircularProgress />
                <Typography>Memuat data...</Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ py: 4 }} maxWidth="xl">
            <Typography variant="h3" fontWeight="900" sx={{ mb: 4, color: '#1976d2', textAlign: 'center' }}>
                FORUM FEED
            </Typography>

            {/* Toolbar Tombol */}
            <Box sx={{ mb: 3, display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="contained" onClick={reloadPosts}>RELOAD DATA</Button>
                
                <Button 
                    variant={sortBy === 'title' ? "contained" : "outlined"} 
                    color="secondary"
                    onClick={() => { setSortBy('title'); setIsSortAscending(!isSortAscending); }}
                >
                    Title {sortBy === 'title' ? (isSortAscending ? '↑' : '↓') : ''}
                </Button>

                <Button 
                    variant={sortBy === 'userName' ? "contained" : "outlined"} 
                    color="secondary"
                    onClick={() => { setSortBy('userName'); setIsSortAscending(!isSortAscending); }}
                >
                    User {sortBy === 'userName' ? (isSortAscending ? '↑' : '↓') : ''}
                </Button>

                <Button 
                    variant={sortBy === 'createdAt' ? "contained" : "outlined"} 
                    color="secondary"
                    onClick={() => { setSortBy('createdAt'); setIsSortAscending(!isSortAscending); }}
                >
                    Date {sortBy === 'createdAt' ? (isSortAscending ? '↑' : '↓') : ''}
                </Button>
            </Box>

            {/* Search Input */}
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <input 
                    placeholder="Cari berdasarkan judul atau nama user..." 
                    style={{ 
                        padding: '12px 20px', 
                        borderRadius: '25px', 
                        width: '100%', 
                        maxWidth: '400px',
                        border: '1px solid #ccc' 
                    }} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </Box>

            {/* Grid Kartu */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', columnGap: 3, rowGap: 5 }}>
                {displayPosts.map(post => (
                    <Box key={post.id} onClick={() => goToPost(post.id)} sx={{ cursor: 'pointer' }}>
                        <PostCardItem post={post} />
                    </Box>
                ))}
            </Box>

            {displayPosts.length === 0 && (
                <Typography sx={{ textAlign: 'center', mt: 5, color: 'gray' }}>
                    Tidak ada postingan yang ditemukan.
                </Typography>
            )}
        </Container>
    );
}