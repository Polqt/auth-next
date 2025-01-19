'use client'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState('Nothing')

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successfully')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/mine')
        setUser(res.data.data._id)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Profile</h1>
            <p>Profile Page</p>
            <h2 className='m-4 p-3 rounded bg-green-800'>
                {user === 'Nothing' ? 'Nothing' : <Link href={`/profile/${user}`}>{user}</Link>}
            </h2>

            <button 
                type='submit'
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >Logout
            </button>

            <button 
                type='submit'
                onClick={getUserDetails}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >Get User Details
            </button>
        </div>
    )
}