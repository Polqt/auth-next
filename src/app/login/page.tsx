'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            toast.success('Login success')
            router.push('/profile')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="mb-4">{loading ? 'Processing' : 'Login'}</h1>
            <label htmlFor="email">Email</label>
            <input
                id='email'
                className='border rounded-lg py-2 px-3 text-black mb-4'
                type='text'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='poyhidalgo@gmail.com'
            />
            <label htmlFor="password">Password</label>
            <input
                id='password'
                className='border rounded-lg py-2 px-3 text-black mb-4'
                type='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Password'
            />

            <button
                onClick={onLogin}
                className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2"
                type="submit"
            >{buttonDisabled ? 'No login' : 'Login'}</button>
            Don&apos;t have an account?<Link href='/signup'>Click this</Link>
        </div>
    )
}