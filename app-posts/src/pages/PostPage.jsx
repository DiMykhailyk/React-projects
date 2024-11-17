import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";


const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostByid, isLoading, error] = useFetching(async (pId) => {
        const response = await PostService.getById(pId);
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (pId) => {
        const response = await PostService.getCommentsByPostId(pId);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostByid(id);
        fetchComments(id);

    }, [])

    return (
        <div>
            {isLoading
                ? <Loader />
                : <div>{post.id}, {post.title}</div>
            }
            <h1>Comments</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} className="post__comm">
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PostPage;