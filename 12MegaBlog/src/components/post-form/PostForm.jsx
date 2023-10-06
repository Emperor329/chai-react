import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Logo,RTE,Select} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit,watch,
        setValue,control,getValues} = useForm({
            defaultValues:{ // check whether user is here to update or create post
                title: post ?.title || '', // remember the syntax in the update post below
                slug: post?.slug || '',
                content: post?.content || '',
                staus: post?.staus || 'active',
            }
        })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const submit = async(data) => {

        if (post) {
            const file = data.image[0] ?await appwriteService.uploadFile(data.image[0]): null

            
            if (file) {
                // it is like emptying input fields in a form after submitting the form
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,// we can directly pass the (data)  here but we have to override some values
                    // override the value
                featuredImage: file ? file.$id : undefined // important line  // remember this syntax
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
        }
        // here file id created at upload file method, is assigned to featuredImage and both have same id
        else{
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]): null

            if (file) {
                // console.log('file');
                // console.log(file);
                const fileId = file.$id
                data.featuredImage = fileId // important line
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    React.useEffect(() => {
        const subscription = watch((value,{name})=> {
            if (name === 'title') {
                setValue("slug", slugTransform(value.title),{shouldValidate: true})// here value is an object
            }
        })
        return () => {
            // optimisation
            subscription.unsubscribe() 
        }

    },[ watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content : " name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} //doubt
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    
  )
}

export default PostForm
