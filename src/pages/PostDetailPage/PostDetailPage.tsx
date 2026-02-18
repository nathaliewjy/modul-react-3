import { Card, CardActions, CardContent, CardHeader, Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Post, PostResponse } from "../../types";
import { useParams } from "react-router";
import LetterAvatar from "../../components/TextAvatar";
import { formatDate } from "../../utils/formatDate";

export default function PostDetailPage() {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  // const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function reloadPosts() {
      // setHasError(false);
      setIsLoading(true);
      try {
        const response = await fetch(`/api/post/${id}`);
        if (!response.ok) {
          // setHasError(true);
          return;
        }
        const data = await response.json() as PostResponse;
        setPost(data);
        // setPostInfo(data.info);
      } catch {
        // setHasError(true);
      }
      setIsLoading(false);
    }
    reloadPosts();
  }, [id])


  return <Container>
    <Stack py={2}>
      <Paper>
        <Stack alignItems='center' p={2}>
          {post && <Card>
            <CardHeader
              avatar={
                <LetterAvatar value={post.user.name} />
              }
              title={post.title}
              subheader={`${post.user.name} ${formatDate(post.createdAt)}`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>}
        </Stack>
      </Paper>
    </Stack>
  </Container>
}