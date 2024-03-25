"use client"

import { Book } from "@/app/book/api/fetchBooks/route";
import { Chapter } from "@/app/book/api/fetchChaptersByBookId/route";
import CubeIcon from "@/app/icon/cube";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Character } from "../api/fetchCharactersByBookId/route";
import CharacterItem from "../components/characterItem";
import ChevronLeftIcon from "@/app/icon/chevronLeft";

export default function Page({ params }: { params: { slug: string } }) {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [book, setBook] = useState<Book | null>(null);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [characters, setCharacters] = useState<Character[]>([]);
    const fetchBookChapters = async () => {
        try {
            const { data } = await fetch('http://localhost:3000/book/api/fetchChaptersByBookId?id=' + params.slug).then(res => res.json());
            setChapters(data);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchBook = async () => {
        try {
            const { data } = await fetch('http://localhost:3000/book/api/fetchBook?id=' + params.slug).then(res => res.json());
            setBook(data);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchCharacters = async () => {
        try {
            const { data } = await fetch('http://localhost:3000/book/api/fetchCharactersByBookId?id=' + params.slug).then(res => res.json());
            setCharacters(data);
        } catch (err) {
            console.log(err);
        }
    }
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    useEffect(() => {
        fetchBookChapters();
        fetchBook();
        fetchCharacters();
    }, []);

    const handleSetChapter = (index: number) => {
        setCurrentChapter(index)
    }

    return <main className="mt-10 max-w-screen-xl m-auto relative h-full">
        <button
            className="m-4 flex justify-center items-center"
            onClick={goBack}
        >
            <div className="border border-black rounded-full w-10 h-10 mr-2 flex justify-center items-center">
                <ChevronLeftIcon />
            </div>
            Back
        </button>
        <section className="relative flex justify-center items-center h-[300px] px-4" >
            <img className="h-full w-[220px]" src={book?.img_url} alt={book?.title} />
            <div className="h-full px-5 w-full overflow-auto">
                <h1 className="text-3xl">{book?.title}</h1>
                <p>By {book?.authors}</p>
                <p>Genre: {book?.genre.replaceAll(',', ' | ')}</p>
                <p>{book?.total_chapters} Chapters</p>
                <p>{book?.total_words} Words</p>
                <p className="hover:text-orange-900"><a href={book?.source_url} target="_blank">Online Book</a></p>
                {
                    book?.nft_ip_id && (
                        <p className="flex items-center">
                            <CubeIcon />
                            <a
                                className="ml-2 hover:text-orange-400"
                                target="_blank"
                                href={"https://explorer.storyprotocol.xyz/ipa/" + book.nft_ip_id}
                            >
                                {book.nft_ip_id}
                            </a>
                        </p>
                    )
                }

            </div>
        </section>
        <section className="flex px-4 mt-4 h-full">
            <div className="w-1/5 shrink-0 mr-2">
                {
                    chapters.length ? <>
                        <h3 className="font-bold text-2xl mb-2">Chapters</h3>
                        <ul>
                            {
                                chapters.map((chapter, index) => <li
                                    className={`${index === currentChapter ? 'text-orange-900 font-bold' : ''} hover:cursor-pointer hover:text-orange-900`}
                                    key={chapter.id}
                                    onClick={() => handleSetChapter(index)}
                                >
                                    {chapter.chapter_name}
                                </li>
                                )
                            }
                        </ul>
                    </> : null
                }
            </div>
            <div className="leading-7 text-lg pb-10">
                <h3 className="text-2xl font-bold mb-2">{chapters[currentChapter]?.chapter_name}</h3>
                {
                    chapters.length ? <p>{chapters[currentChapter]?.content}</p> : null
                }
            </div>
            {
                characters.length ? (
                    <div className="ml-4 w-1/5 shrink-0 text-pretty break-words">
                        <div className="border border-black p-2">
                            <h3 className="font-bold text-2xl">Characters</h3>
                            <ul>{
                                characters.map(
                                    (character) => <CharacterItem character={character} key={character.id} />
                                )
                            }</ul>
                        </div>
                    </div>
                ) : null
            }
        </section>
    </main>
}