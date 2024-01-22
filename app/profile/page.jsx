"use client"

import {useEffect,useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@components/Profile';

const MyProfile = () => {
    const { data:session }= useSession();
    const [posts, setPosts]=useState([]);


    useEffect(()=>{
        const fetchPosts=async ()=>{
          const response=await fetch(`/api/users/${session?.user.id}/posts`);
          const data=await response.json();
          setPosts(data);
        }
        console.log(posts);
       if(session?.user.id) fetchPosts();
      },[])


    const handleEdit=async()=>{

    }
    const handleDelete=async()=>{

    }
  return (
   <Profile
   name="My"
   desc="welcome to your profile page"
   data={[]}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   />
  )
}

export default MyProfile