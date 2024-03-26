import { DB_TABLE_NAME } from './constants'

export const createBookScript = `
create table if not exists ${DB_TABLE_NAME.BOOK} 
    (
        id varchar PRIMARY KEY,
        title varchar,
        publisher varchar,
        authors varchar,
        language varchar,
        rights varchar,
        issued_date varchar,
        total_chapters integer,
        total_words integer,
        source_url varchar,
        nft_ip_id varchar,
        genre varchar,
        img_url varchar
    )
`;

export const creatChapterScript = `
create table if not exists ${DB_TABLE_NAME.CHAPTER} 
    (
        id varchar PRIMARY KEY,
        belongs_to varchar,
        chapter_num intager,
        chapter_name varchar,
        content varchar,
        nft_ip_id varchar,
        image_url varchar
    )
`;

export const creatIpAssetScript = `
create table if not exists ${DB_TABLE_NAME.IP_ASSET} 
    (
        id varchar PRIMARY KEY,
        name varchar,
        source_from varchar,
        source_id varchar,
        ip_id varchar,
        policies varchar,
        licenses varchar,
        image_url varchar
    )
`;

export const createCharacter = `
create table if not exists ${DB_TABLE_NAME.CHARACTER} 
    (
        id varchar PRIMARY KEY,
        belongs_to varchar,
        name varchar,
        nft_ip_id varchar,
        image_url varchar
    )
`;