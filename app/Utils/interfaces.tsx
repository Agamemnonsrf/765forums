type boardT =
    | "tech"
    | "trvl"
    | "fit"
    | "out"
    | "entm"
    | "sci"
    | "lit"
    | "game"
    | "art"
    | "news";

interface ThreadI extends ThreadIfb {
    replies: ThreadReplyI[];
}

interface ThreadPreviewI {
    thread_id: number;
    title: string;
    reply_count: number;
}

interface ThreadIfb extends ThreadSkeletonI {
    thread_id: number;
    board: boardT;
}

interface ThreadSkeletonI {
    body: string;
    title: string;
    created_at: string;
    last_updated: string;
    image: string | null;
}

interface ThreadReplyI {
    reply_id: number;
    thread_id: number;
    content: string;
    created_at: string;
    replying_to: number | null;
}

interface MediaI {
    media_id: string;
    url: string | null;
    file_name: string;
    file_type: string;
    kilobytes: number;
}

export type {
    ThreadI,
    ThreadIfb,
    ThreadReplyI,
    ThreadSkeletonI,
    MediaI,
    ThreadPreviewI,
    boardT,
};
