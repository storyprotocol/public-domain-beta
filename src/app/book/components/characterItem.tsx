import CubeIcon from "@/app/icon/cube"

interface IProps {
    character: any
}
export default function CharacterItem({
    character
}: IProps) {
    return (
        <li
            className="relative h-[200px] bg-no-repeat bg-cover bg-center mt-2"
            key={character.id}
            style={{
                backgroundImage: `url(${character.image_url || ''})`
            }}
        >
            <div className="flex absolute bottom-0 w-full bg-black/50 text-white break-all">
                <CubeIcon />
                {
                    character.nft_ip_id ? (
                        <div>
                            <p
                                className="ml-2 text-xs"
                            >
                                {character.name}
                            </p>
                            <a
                                className="ml-2 hover:text-orange-400 text-xs"
                                target="_blank"
                                href={"https://explorer.storyprotocol.xyz/ipa/" + character.nft_ip_id}
                            >
                                {character.nft_ip_id}
                            </a>
                        </div>) : (<p
                            className="ml-2 hover:text-orange-400 text-xs"
                        >
                            {character.name}
                        </p>
                    )
                }
            </div>
        </li>
    )
}