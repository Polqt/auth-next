import { dbConnect } from '@/db/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'

dbConnect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpire: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid token or token expired' }, { status: 400 })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpire = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}