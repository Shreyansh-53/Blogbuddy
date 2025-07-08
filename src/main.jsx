import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddPost from './components/pages/AddPost.jsx'
import AllPost from './components/pages/AllPost.jsx'
import EditPost from './components/pages/EditPost.jsx'
import Home from './components/pages/Home.jsx'
import LoginComponent from './components/pages/LoginComp.jsx'
import Post from './components/pages/Post.jsx'
import SignupComponent from './components/pages/SignUp.jsx'
import Protected from './components/AuthLayout.jsx'
import YourPosts from './components/pages/YourPost.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
            <LoginComponent />
          </Protected>
        ),
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <SignupComponent />
          </Protected>
        ),
      },
      {
        path:'/your-posts',
        element:(
          <Protected authentication >
            <YourPosts />
          </Protected>
        ),
      },
      {
        path:'/all-posts',
        element:(
          <Protected authentication >
            <AllPost />
          </Protected>
        ),
      },
      {
        path:'/add-post',
        element:(
          <Protected authentication >
            <AddPost />
          </Protected>
        ),
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Protected authentication >
            <EditPost />
          </Protected>
        ),
      },
      {
        path:'/post/:slug',
        element:<Post/>,
      },
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
