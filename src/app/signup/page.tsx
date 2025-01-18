'use client'

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { axios } from "axios"

export default function SignupPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="mb-4">Signup</h1>
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
                className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2"
                type="submit"
            >Signup</button>
            Have an account?<Link href='/login'>Click this</Link>
        </div>
    )
}