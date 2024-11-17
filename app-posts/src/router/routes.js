import Posts from "../pages/Posts";
import About from "../pages/About";
import Login from "../pages/Login";
import PostPage from "../pages/PostPage";


export const privateRoutes = [
    {path: '/about', component: About, exact: true}, 
    {path: '/posts', component: Posts, exact: true}, 
    {path: '/posts/:id', component: PostPage, exact: true},  
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},  
]
