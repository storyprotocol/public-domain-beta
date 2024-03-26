import Link from "next/link";

export default function () {


    return <main className="h-screen w-full mt-10 flex justify-center flex-col items-center xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <h1 className="text-5xl">Public Domain IPs</h1>
        <p className="mt-4">10 books for your reading.</p>
        <Link href="/book/">
            <button className="border mt-10 border-black rounded-md px-2 py-1 hover:bg-orange-900 hover:text-white w-full lg:w-auto md:w-auto">
                Get Start
            </button>
        </Link>
    </main>
}