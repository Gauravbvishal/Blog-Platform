import Link from 'next/link';
import Image from 'next/image';
export default function Headers() {
    return (
        <div className='flex justify-between m-5'>
            <Image
                src='/assets/image.jpg'
                height={50}
                width={40}
                alt="Image for Headers"
                className='rounded'
            />
            <ul className='flex gap-6 m-2'>
                <li><Link href="/users/mainPage">Create Blog</Link></li>
                <li> <Link href="/users/blogs">All Blogs</Link></li>
                <li> <Link href="/">Logout</Link></li>
            </ul>
        </div>
    )
}