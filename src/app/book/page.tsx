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

    return <>
        <h1 className="text-5xl mb-4 mx-4">Public Domain IPs</h1>
        {
            books.length ? <ul className="grid grid-cols-1 gap-1 xl:grid-cols-2">
                {
                    books.map((b) => <BookListItem book={b} key={b.id} />)
                }
            </ul> : null
        }
    </>
}