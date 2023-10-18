"use client";
import { useState } from "react";

import React from "react";
import { ThreadI, ThreadReplyI } from "../Utils/interfaces";
import ThreadReply from "./ThreadReply";
import Link from "next/link";
import { adjustTZ, completeId, decideTime } from "../Utils/utils";

import PostReplyPopUp from "../Components/PostReplyPopUp";

interface Props {
    body: string;
    title: string;
    thread_id: number;
    created_at: string;
    last_updated: string;
    image?: string;
    replies?: ThreadReplyI[];
    clickedHideThreads?: boolean;
    setThread?: React.Dispatch<React.SetStateAction<ThreadI>>;
    setLastUpdate?: React.Dispatch<React.SetStateAction<string>>;
    singleThread: boolean;
}

function Thread(props: Props) {
    const [clickedPostReply, SetClickedPostReply] = useState(false);
    const [replyTextareaInput, SetReplyTextareaInput] = useState("");
    const [clickedThreadImage, SetClickedThreadImage] = useState(false);
    const [clickedRevealThread, SetClickedRevealThread] = useState(false);
    const [clickedRevealReplies, SetClickedRevealReplies] = useState(true);
    const [clickedReplytoReply, SetClickedReplytoReply] = useState(false);
    const [ReplytoReplyto, SetReplytoReplyto] = useState(0);
    const [highlightThread, SetHighlightThread] = useState(false);
    const [highlightThisReply, SetHighlightThisReply] = useState(0);
    const [highlightThisReplyTextValue, SetHighlightThisReplyTextValue] =
        useState("");
    const [hovering, SetHovering] = useState(false);
    const [mouseCord, SetMouseCord] = useState({ x: 0, y: 0 });
    const [hoveringTime, setHoveringTime] = useState(false);
    const [hoveringLastReply, setHoveringLastReply] = useState(false);

    const handleMouseMove = (screenX: number, clientY: number) => {
        SetMouseCord({ x: screenX, y: clientY + window.scrollY });
    };

    function handleReplyTextareaChange(replyTextareaInputChange: string) {
        SetReplyTextareaInput(replyTextareaInputChange);
    }

    const local_created_at = adjustTZ(new Date(props.created_at));
    const local_last_updated = adjustTZ(new Date(props.last_updated));

    return (
        <div
            className="ThreadContainer"
            style={{
                backgroundColor: highlightThread
                    ? "rgb(42, 40, 40)"
                    : "rgb(32, 30, 30)",
                transition: ".2s",
            }}
            key={props.thread_id}
        >
            {props.singleThread ? (
                <>
                    <a
                        className="HyperText"
                        style={{
                            textAlign: "right",
                            float: "right",
                            textDecoration: "none",
                        }}
                        onClick={() => {
                            SetClickedPostReply(!clickedPostReply);
                            SetClickedReplytoReply(false);
                            SetReplyTextareaInput("");
                        }}
                    >
                        [Reply to Thread]
                    </a>{" "}
                    <div
                        style={{
                            float: "right",
                            right: "2rem",
                            position: "fixed",
                        }}
                    >
                        <PostReplyPopUp
                            clickedPostReply={clickedPostReply}
                            SetClickedPostReply={SetClickedPostReply}
                            replyTextareaInput={replyTextareaInput}
                            SetReplyTextareaInput={SetReplyTextareaInput}
                            handleReplyTextareaChange={
                                handleReplyTextareaChange
                            }
                            clickedReplytoReply={clickedReplytoReply}
                            SetClickedReplytoReply={SetClickedReplytoReply}
                            threadID={props.thread_id}
                            ReplytoReplyto={ReplytoReplyto}
                            {...(props.singleThread && {
                                setThread: props.setThread,
                            })}
                            {...(props.singleThread && {
                                setLastUpdate: props.setLastUpdate,
                            })}
                        />
                    </div>
                </>
            ) : (
                <>
                    <a
                        className="HyperText"
                        onClick={() =>
                            SetClickedRevealThread(!clickedRevealThread)
                        }
                        style={{ display: "inline-block" }}
                    >
                        {clickedRevealThread
                            ? "Reveal Thread <..."
                            : "Collapse Thread >..."}
                    </a>
                    <Link
                        href={`/thread/${completeId(props.thread_id)}`}
                        className="HyperText"
                        style={{
                            textAlign: "right",
                            float: "right",
                            textDecoration: "none",
                        }}
                    >
                        [See Thread]
                    </Link>
                </>
            )}{" "}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                    onMouseEnter={() => setHoveringTime(true)}
                    onMouseLeave={() => setHoveringTime(false)}
                    className="HyperTextsm"
                    id="thread-time"
                >
                    Thread Creation: {decideTime(props.created_at)}
                    <span className={`time-modal ${hoveringTime && `show`}`}>
                        {local_created_at.toISOString().split("T")[0]}
                        <br></br>
                        {
                            local_created_at
                                .toISOString()
                                .split("T")[1]
                                .split(".")[0]
                        }
                    </span>
                </p>
                {props.replies && props.replies.length > 0 && (
                    <p
                        className="HyperTextsm"
                        onMouseEnter={() => setHoveringLastReply(true)}
                        onMouseLeave={() => setHoveringLastReply(false)}
                        id="thread-last-reply"
                    >
                        Last Reply: {decideTime(props.last_updated)}
                        <span
                            className={`time-modal ${
                                hoveringLastReply && `show`
                            }`}
                        >
                            {local_last_updated.toISOString().split("T")[0]}
                            <br></br>
                            {
                                local_last_updated
                                    .toISOString()
                                    .split("T")[1]
                                    .split(".")[0]
                            }
                        </span>
                    </p>
                )}{" "}
                <h3 className="HyperTextsm">
                    Thread ID: {completeId(props.thread_id)}
                    <br />
                </h3>
            </div>
            <p className="ThreadTitle">{props.title}</p>
            <br />
            <div
                style={{
                    display: clickedRevealThread ? "none" : "block",
                }}
            >
                <div
                    style={{
                        display: props.clickedHideThreads ? "none" : "block",
                    }}
                >
                    {props.image && (
                        <>
                            <a
                                className="HyperText"
                                href={
                                    "http://localhost:3001/media/" + props.image
                                }
                                target="_blank"
                                style={{ fontSize: "smaller" }}
                            >
                                {"http://localhost:3001/media/" + props.image}
                            </a>
                            <img
                                style={{
                                    cursor: "pointer",
                                    width: clickedThreadImage ? "100%" : "15%",
                                }}
                                src={
                                    "http://localhost:3001/media/" + props.image
                                }
                                className="ThreadImg"
                                onClick={() =>
                                    SetClickedThreadImage(!clickedThreadImage)
                                }
                            />
                        </>
                    )}
                    <div
                        className="ThreadText"
                        style={{ wordWrap: "break-word" }}
                    >
                        {props.body}
                    </div>

                    <br />
                    <div style={{ clear: "both" }}></div>
                    <a
                        className="HyperText"
                        style={{ display: "inline-block" }}
                        onClick={() =>
                            SetClickedRevealReplies(!clickedRevealReplies)
                        }
                    >
                        {props.replies && props.replies.length}{" "}
                        {props.replies && props.replies.length == 1
                            ? "Reply"
                            : "Replies"}
                        {", "}
                        {clickedRevealReplies ? "Collapse <..." : "Reveal >..."}
                    </a>
                    {clickedRevealReplies && (
                        <div>
                            {props.replies &&
                                props.replies.map((reply) => (
                                    <ThreadReply
                                        {...reply}
                                        highlightThisReply={highlightThisReply}
                                        SetHighlightThisReply={
                                            SetHighlightThisReply
                                        }
                                        highlightThisReplyTextValue={
                                            highlightThisReplyTextValue
                                        }
                                        SetHighlightThisReplyTextValue={
                                            SetHighlightThisReplyTextValue
                                        }
                                        SetHighlightThread={SetHighlightThread}
                                        SetHovering={SetHovering}
                                        handleMouseMove={handleMouseMove}
                                        hovering={hovering}
                                        mouseCord={mouseCord}
                                        threadId={props.thread_id}
                                        key={reply.reply_id}
                                        clickedReplytoReply={
                                            clickedReplytoReply
                                        }
                                        SetClickedReplytoReply={
                                            SetClickedReplytoReply
                                        }
                                        SetClickedPostReply={
                                            SetClickedPostReply
                                        }
                                        SetReplytoReplyto={SetReplytoReplyto}
                                        replies={props.replies}
                                        singleThread={props.singleThread}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Thread;
