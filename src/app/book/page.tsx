"use client"

import { useEffect, useState } from "react";
import { Book } from "./api/fetchBooks/route";
import BookListItem from "./components/bookListItem";
import Loading from "../components/Loading";

export default function () {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchBooks = async () => {
        try {
            const { data } = await fetch('/book/api/fetchBooks').then(res => res.json());
            setBooks(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchBooks();
    }, []);

    return loading ? <Loading /> : <>
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