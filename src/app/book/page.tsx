"use client"

import { useEffect, useState } from "react";
import { Book } from "./api/fetchBooks/route";
import BookListItem from "./components/bookListItem";

export default function () {
    const [books, setBooks] = useState<Book[]>([]);
    const fetchBooks = async () => {
        try {
            const { data } = await fetch('http://localhost:3000/book/api/fetchBooks').then(res => res.json());
            setBooks(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchBooks();
    }, []);

    return <main className="h-full w-full mt-10 max-w-screen-xl m-auto">
        <h1 className="text-5xl mb-4">Public Domain IPs</h1>
        {
            books.length ? <ul>
                {
                    books.map((b) => <BookListItem book={b} key={b.id} />)
                }
            </ul> : null
        }
    </main>
}