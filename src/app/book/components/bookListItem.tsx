import { Book } from "@/app/book/api/fetchBooks/route";
import CubeIcon from "@/app/icon/cube";
import Link from "next/link";

interface IProps {
    book: Book
}

export default function BookListItem({ book }: IProps) {
    return <li className="flex overflow-hidden p-4 flex-col items-center md:items-start md:flex-row md:mb-4">
        <img
            className="h-[300px] w-[220px] object-cover mr-2 shrink-0 mb-4 md:mb-0"
            alt={book.title}
            src={book.img_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg"}
        />
        <div className="p-2">
            <h3 className="text-4xl">{book.title}</h3>
            {
                book.nft_ip_id && (
                    <p className="flex items-center text-sm">
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

            <p>By {book.authors}</p>
            <p>Genre: {book.genre.replaceAll(',', ' | ')}</p>
            <p>{book.total_chapters} Chapters</p>
            <p>{book.total_words} Words</p>
            <p className="hover:text-orange-900"><a href={book.source_url} target="_blank">Online Book</a></p>
            <Link href={`/book/${book.id}`}>
                <button className="border border-black rounded-md px-2 py-1 hover:bg-orange-900 hover:text-white w-full mb:w-auto">
                    Read
                </button>
            </Link>
        </div>
    </li>
}
