interface UserProfileParams {
    id: string;
}

export default function UserProfile({params}: { params: UserProfileParams }) {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Profile</h1>
            <p className="text-2xl">Hellow {params.id}</p>
        </div>
    )
}