import React ,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {useParams,useNavigate} from 'react-router-dom'
import { Container,PostForm } from '../components/index'

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()// use params gives values from the current url
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }
        else{
            navigate("/")
        }
    },[slug, navigate])
    
  return post ?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost