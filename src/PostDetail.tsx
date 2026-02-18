import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Post = {
    id: string
    title: string
    content: string
    createdAt: string
    user: {
        name: string
    }
}

export default function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState<Post>()
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }


    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/post/${id}`)
            const data = await response.json()
            setPost(data)
        }
        fetchPost()
    }, [id])

    // if (!post) {
    //     return <div>Post not found</div>
    // }
    // return <div>
    //     <div>Title : {post.title}</div>
    //     <div>Content : {post.content}</div>
    // </div>

    return <div>
        <div>title: {post?.title}</div>
        <div>content: {post?.content}</div>
        <div>
            <button onClick={back}>Back</button>
        </div>
    </div>
}