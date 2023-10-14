"use client";
import { useState } from "react";
import PostReplyPopUp from "../../Components/PostReplyPopUp";
import ThreadReplyRepliable from "../../Components/ThreadReplyRepliable";

import { AiOutlineStar, AiFillStar, AiFillPushpin } from "react-icons/ai";
import React from "react";
import { ThreadI, ThreadReplyI } from "../../Utils/interfaces";
import ThreadReply from "../../Components/ThreadReply";
import Link from "next/link";
import { decideTime, completeId, adjustTZ } from "../../Utils/utils";

//1) Implement replying to replies and also implement user ID's
//2) Implement to be able to make a thread that has a poll in it
//3) user can input a posterID when he makes a thread, and also a password
//he will be able to delete or add images to a thread with captions after he has created
//as long as he writes the correct password (and posterID (posterID is public))
//4) button on thread that when clicked smooth scrolls to next thread
//5) thread displays its rank amongst the other threads

interface Props {
    body: string;
    title: string;
    thread_id: number;
    created_at: string;
    last_updated: string;
    image?: string;
    replies?: ThreadReplyI[];
    clickedHideThreads?: boolean;
    setThread: React.Dispatch<React.SetStateAction<ThreadI>>;
    setLastUpdate: React.Dispatch<React.SetStateAction<string>>;
}

function SingleThread(props: Props) {
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

    function handleClickRevealThread() {
        SetClickedRevealThread(!clickedRevealThread);
    }
    function handleClickRevealReplies() {
        SetClickedRevealReplies(!clickedRevealReplies);
    }
    function handleReplyTextareaChange(replyTextareaInputChange: string) {
        SetReplyTextareaInput(replyTextareaInputChange);
    }
    function handleClickThreadImage() {
        SetClickedThreadImage(!clickedThreadImage);
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
                transition: ".1s",
            }}
        >
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
                    handleReplyTextareaChange={handleReplyTextareaChange}
                    clickedReplytoReply={clickedReplytoReply}
                    SetClickedReplytoReply={SetClickedReplytoReply}
                    threadID={props.thread_id}
                    ReplytoReplyto={ReplytoReplyto}
                    setThread={props.setThread}
                    setLastUpdate={props.setLastUpdate}
                />
            </div>
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
                )}
            </div>
            <h3
                style={{
                    color: "white",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
            >
                Thread ID: {completeId(props.thread_id)}
                <br />
            </h3>
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
                                    width: clickedThreadImage ? "30%" : "15%",
                                }}
                                src={
                                    "http://localhost:3001/media/" + props.image
                                }
                                className="ThreadImg"
                                onClick={handleClickThreadImage}
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
                        onClick={handleClickRevealReplies}
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
                                    <ThreadReplyRepliable
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
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default SingleThread;
