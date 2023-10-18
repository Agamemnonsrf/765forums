"use client";
import { useEffect, useState } from "react";
import "/public/App.css";

import Thread from "./Components/Thread";
import SubHeader from "./Components/SubHeader";

import { TestContext } from "./Utils/context";

import Masonry from "react-masonry-css";
import React from "react";
import { ThreadI, MediaI } from "./Utils/interfaces";

import { getAllThreads } from "./Utils/api-utils";

export default function Home() {
    const [clickedCreateThread, SetClickedCreateThread] = useState(false);
    const [textareaInput, SetTextareaInput] = useState("");
    const [titleTextareaInput, SetTitleTextareaInput] = useState("");
    const [clickedHideThreads, SetClickedHideThreads] = useState(false);
    const [threadLayout, SetThreadLayout] = useState(1);
    const [threadImage, SetThreadImage] = useState<MediaI>();
    const [highlightEmptyField, SetHighlightEmptyField] = useState(false);
    const [Threads, setThreads] = useState<ThreadI[]>([]);
    const [errorLoadingThreads, setErrorLoadingThreads] = useState(false);
    const [noThreadsinDB, setNoThreadsinDB] = useState(false);

    useEffect(() => {
        getAllThreads()
            .then((data) => {
                if (data.length === 0) {
                    setNoThreadsinDB(true);
                }
                setThreads(data);
            })
            .catch((err) => {
                setErrorLoadingThreads(true);
            });
    }, []);

    function handleCreateThreadPopup() {
        SetClickedCreateThread(!clickedCreateThread);
        SetTextareaInput("");
        SetTitleTextareaInput("");
    }

    return (
        <TestContext.Provider
            value={{
                clickedCreateThread,
                SetClickedCreateThread,
                titleTextareaInput,
                textareaInput,
                SetTitleTextareaInput,
                SetTextareaInput,
                handleCreateThreadPopup,
                threadLayout,
                SetThreadLayout,
                SetClickedHideThreads,
                clickedHideThreads,
                SetThreadImage,
                threadImage,
                highlightEmptyField,
                setThreads,
                SetHighlightEmptyField,
                getAllThreads,
            }}
        >
            <SubHeader />
            <Masonry
                breakpointCols={threadLayout}
                className="masongrid"
                columnClassName="masongridcolumn"
            >
                {Threads.length > 0 || noThreadsinDB ? (
                    Threads.map((item: ThreadI) => (
                        <div key={item.thread_id}>
                            <Thread
                                thread_id={item.thread_id}
                                body={item.body}
                                title={item.title}
                                replies={item?.replies}
                                created_at={item.created_at}
                                image={item?.image ?? ""}
                                last_updated={item.last_updated}
                                clickedHideThreads={clickedHideThreads}
                                singleThread={false}
                            />
                        </div>
                    ))
                ) : (
                    <div className="Loading">Loading...</div>
                )}
                {errorLoadingThreads && (
                    <div className="Loading">
                        Error loading threads, please try again...
                    </div>
                )}
            </Masonry>
            <div className="Footer">
                {" "}
                <a className="HyperText" style={{ display: "inline-block" }}>
                    [Page 1]
                </a>{" "}
            </div>
        </TestContext.Provider>
    );
}
