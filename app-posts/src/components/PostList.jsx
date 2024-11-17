import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../styles/App.css";

const PostList = ({ posts, title, remove }) => {

    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>Posts not found</h1>
        )
    }

    return (
        <div>
            <h1 className="post__title">
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, i) => {
                    const nodeRef = React.createRef();
                    return (
                        <CSSTransition
                            nodeRef={nodeRef}
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                            <PostItem
                                nodeRef={nodeRef}
                                remove={remove}
                                post={post}
                                key={post.id} />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </div>
    )
}

export default PostList;