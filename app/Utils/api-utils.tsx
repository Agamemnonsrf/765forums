import { MediaI, ThreadI, ThreadIfb, ThreadReplyI } from "./interfaces";
import { useState } from "react";

const getAllThreads = async (): Promise<ThreadI[]> => {
    const url = new URL("http://localhost:3001/threads");
    const response = await fetch(url);
    const threads = await response.json();
    return threads;
};

const getThread = async (id: number): Promise<ThreadI> => {
    const url = new URL(`http://localhost:3001/threads/${id}`);
    const response = await fetch(url);
    const thread = await response.json();
    return thread;
};

const usePostThread = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const postThread = async (
        thread: ThreadIfb,
        media?: MediaI,
        file = null
    ) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        const threadUrl = new URL("http://localhost:3001/threads");
        const mediaUrl = new URL("http://localhost:3001/upload-media");
        const recordMediaUrl = new URL("http://localhost:3001/record-media");

        if (media && file) {
            const formData = new FormData();

            const completedFile = new File(
                [file],
                media.media_id + "-" + (file as File).name
            );
            formData.append("file", completedFile);

            const mediaResponse = await fetch(mediaUrl, {
                method: "POST",
                body: formData,
            });

            if (mediaResponse.ok) {
                const mediaRecordResponse = await fetch(recordMediaUrl, {
                    method: "POST",
                    body: JSON.stringify({
                        ...media,
                        url: media.media_id + "-" + media.file_name,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (mediaRecordResponse.ok) {
                    const threadResponse = await fetch(threadUrl, {
                        method: "POST",
                        body: JSON.stringify(thread),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (threadResponse.ok) {
                        setSuccess(true);
                    } else {
                        console.log(await threadResponse.json());
                        setError(threadResponse.statusText || "ERROR");
                        setIsLoading(false);
                    }
                } else {
                    console.log(await mediaRecordResponse.json());
                    setError(mediaRecordResponse.statusText || "ERROR");
                    setIsLoading(false);
                }
            } else {
                console.log(await mediaResponse.json());
                setError(mediaResponse.statusText || "ERROR");
                setIsLoading(false);
            }
            setIsLoading(false);
        } else {
            const threadResponse = await fetch(threadUrl, {
                method: "POST",
                body: JSON.stringify(thread),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (threadResponse.ok) {
                setSuccess(true);
            } else {
                setError(threadResponse.statusText || "ERROR");
            }
            setIsLoading(false);
        }
    };

    return { isLoading, error, success, postThread };
};

const usePostReply = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const postReply = async (reply: ThreadReplyI) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        const url = new URL("http://localhost:3001/replies");
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reply),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setSuccess(true);
        } else {
            setError(response.statusText);
        }
        setIsLoading(false);
    };

    return { isLoading, error, success, setSuccess, postReply, setError };
};

export { getAllThreads, getThread, usePostThread, usePostReply };
