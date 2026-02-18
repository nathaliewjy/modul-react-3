import { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (response.ok) {
            navigate('/post');
        } else {
            setError(data.message || 'Gagal membuat post');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>Buat Post Baru</Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Judul"
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Konten"
                        margin="normal"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{ mt: 3 }}
                    >
                        Publish Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}