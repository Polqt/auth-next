'use client'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successfully')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Profile</h1>
            <p>Profile Page</p>

            <button 
                type='submit'
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >Logout
            </button>
        </div>
    )
}