'use client'

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { axios } from "axios"

export default function LoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="mb-4">Login</h1>
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
            >Login</button>
            Don&apos;t have an account?<Link href='/signup'>Click this</Link>
        </div>
    )
}