import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import type { Post } from "../../types";
import { Visibility, Edit, Delete } from '@mui/icons-material'
import { Link, useNavigate } from "react-router";
import LetterAvatar from "../../components/TextAvatar";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useAppSelector";

type PostListPageCardProps = {
  post: Post
  onDelete: (id: string) => void
}

export function PostListPageCard(props: PostListPageCardProps) {
  const { post, onDelete } = props;
  const navigate = useNavigate()
  const userInfo = useAppSelector((state) => state.auth.userInfo)

  console.log("ID Saya:", userInfo?.user?.id)
  console.log("ID Pemilik Post:", post.userId)

  const isMyPost = userInfo?.user?.id === post.userId

  return <Card >
    <CardHeader
      avatar={
        <LetterAvatar value={post.user.name} />
      }
      title={post.title}
      subheader={`${post.user.name} ${formatDate(post.createdAt)}`}
    />

    <CardContent sx={{ height: 80, overflow: 'auto' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {post.content}
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
      <Link to={`/post/${post.id}`}>
        <IconButton aria-label="visit">
          <Visibility />
        </IconButton>
      </Link>

      {isMyPost && (
      <>
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => navigate(`/post/edit/${post.id}`)}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => onDelete(post.id)}
        >
          <Delete />
        </IconButton>
      </>
    )}
    </CardActions>
  </Card>
}