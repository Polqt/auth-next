'use client'

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            toast.success('Successfully created!', { removeDelay: 500 })
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="mb-4">{loading ? 'Processing' : 'Signup'}</h1>
            <label htmlFor="username">Username</label>
            <input
                id='username'
                className='border rounded-lg py-2 px-3 text-black mb-4'
                type='text'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='Username'
            />

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
                onClick={onSignup}
                className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 px-3 py-2"
                type="submit"
            >{buttonDisabled ? 'No Signup' : 'Signup'}</button>
            Have an account?<Link href='/login'>Click this</Link>
        </div>
    )
}