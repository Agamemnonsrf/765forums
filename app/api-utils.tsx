import { ThreadI, ThreadIfb, ThreadReplyI } from "./interfaces";
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

    const postThread = async (thread: ThreadIfb, image = null) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        const url = new URL("http://localhost:3001/threads");
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(thread),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setSuccess(true);
        } else {
            console.log(JSON.stringify(thread));
            console.log(await response.json());
            setError(response.statusText);
        }
        setIsLoading(false);
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
            console.log(await response.json());
            setError(response.statusText);
        }
        setIsLoading(false);
    };

    return { isLoading, error, success, setSuccess, postReply };
};

export { getAllThreads, getThread, usePostThread, usePostReply };
