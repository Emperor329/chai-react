import React from 'react'
import { Container, PostForm } from '../components'
import Post from './Post'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
            
        </Container>
    </div>
  )
}

export default AddPost