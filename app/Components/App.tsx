import { useEffect, useState } from "react";
import "./App.css";

import Thread from "./Thread";
import SubHeader from "./SubHeader";
import { FaJoint } from "react-icons/fa";

import { TestContext } from "../context";

import Masonry from "react-masonry-css";
import React from "react";
import { ThreadI, ThreadIfb, ThreadReplyI } from "../interfaces";

import { getThreads, usePostThread } from "../firebase";

function App() {
    const [clickedCreateThread, SetClickedCreateThread] = useState(false);
    const [textareaInput, SetTextareaInput] = useState("");
    const [titleTextareaInput, SetTitleTextareaInput] = useState("");
    const [clickedHideThreads, SetClickedHideThreads] = useState(false);
    const [threadLayout, SetThreadLayout] = useState(1);
    const [threadImage, SetThreadImage] = useState({});
    const [clickedBks, SetClickedBks] = useState(false);
    const [highlightEmptyField, SetHighlightEmptyField] = useState(false);
    const [Threads, setThreads] = useState<ThreadI[]>([]);
    const uuid = require("react-uuid");

    useEffect(() => {
        document.body.style.backgroundColor = "rgb(66, 65, 65)";
        document.body.style.overflowX = "hidden";

        getThreads()
            .then((data) => {
                setThreads(data as ThreadI[]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCreateThreadPopup() {
        SetClickedCreateThread(!clickedCreateThread);
        SetTextareaInput("");
        SetTitleTextareaInput("");
    }

    function handleSubmitThread() {
        if (textareaInput === "" || titleTextareaInput === "") {
            SetHighlightEmptyField(true);
        } else {
            const newThread: ThreadI = {
                threadTextValue: textareaInput,
                threadTitle: titleTextareaInput,
                id: uuid().toString().split("-")[0],
                threadTime: new Date().toLocaleTimeString(),
                replies: [],
            };
            setThreads((prev: any) => {
                if (prev) {
                    return [...prev, newThread];
                } else {
                    return [newThread];
                }
            });
            SetThreadImage([]);
            SetClickedCreateThread(false);
            SetTextareaInput("");
            SetTitleTextareaInput("");
            SetHighlightEmptyField(false);
        }
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
                handleSubmitThread,
                handleCreateThreadPopup,
                threadLayout,
                SetThreadLayout,
                SetClickedHideThreads,
                clickedHideThreads,
                SetThreadImage,
                threadImage,
                clickedBks,
                SetClickedBks,
                highlightEmptyField,
                setThreads,
                SetHighlightEmptyField,
                usePostThread,
                getThreads,
            }}
        >
            <div className="Container">
                <div className="Header" id="top" style={{ userSelect: "none" }}>
                    <span style={{ transform: "scaleX(-1)" }}>
                        <FaJoint size={25} />
                    </span>{" "}
                    765 Forums <FaJoint size={25} />{" "}
                </div>
                <SubHeader />
                <Masonry
                    breakpointCols={threadLayout}
                    className="masongrid"
                    columnClassName="masongridcolumn"
                >
                    {Threads &&
                        Threads.map((item: any) => (
                            <div key={item.id}>
                                <Thread
                                    thread_id={item.id}
                                    body={item.threadTextValue}
                                    title={item.threadTitle}
                                    replies={item?.replies}
                                    created_at={item.threadTime}
                                    image={item?.imageUrl}
                                    clickedHideThreads={clickedHideThreads}
                                />
                            </div>
                        ))}
                </Masonry>
                <div className="Footer">
                    {" "}
                    <a
                        className="HyperText"
                        style={{ display: "inline-block" }}
                    >
                        [Page 1]
                    </a>{" "}
                </div>
            </div>
        </TestContext.Provider>
    );
}

export default App;
