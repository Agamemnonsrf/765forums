"use client";
import { useState } from "react";
import PostReplyPopUp from "./PostReplyPopUp";

import { AiOutlineStar, AiFillStar, AiFillPushpin } from "react-icons/ai";
import React from "react";
import { ThreadI, ThreadReplyI } from "../interfaces";
import ThreadReply from "./ThreadReply";
import Link from "next/link";
import { adjustTZ, completeId, decideTime } from "../utils";

//1) Implement replying to replies and also implement user ID's
//2) Implement to be able to make a thread that has a poll in it
//3) user can input a posterID when he makes a thread, and also a password
//he will be able to delete or add images to a thread with captions after he has created
//as long as he writes the correct password (and posterID (posterID is public))
//4) button on thread that when clicked smooth scrolls to next thread

interface Props {
    body: string;
    title: string;
    thread_id: number;
    created_at: string;
    last_updated: string;
    image?: string;
    replies?: ThreadReplyI[];
    clickedHideThreads?: boolean;
}

function Thread(props: Props) {
    const [clickedPostReply, SetClickedPostReply] = useState(false);
    const [replyTextareaInput, SetReplyTextareaInput] = useState("");
    const [clickedThreadImage, SetClickedThreadImage] = useState(false);
    const [clickedRevealThread, SetClickedRevealThread] = useState(false);
    const [clickedRevealReplies, SetClickedRevealReplies] = useState(true);
    const [clickedReplytoReply, SetClickedReplytoReply] = useState(false);
    const [ReplytoReplyto, SetReplytoReplyto] = useState("");
    const [ReplytoReplytoKey, SetReplytoReplytoKey] = useState("");
    const [highlightThread, SetHighlightThread] = useState(false);
    const [highlightThisReply, SetHighlightThisReply] = useState("");
    const [highlightThisReplyTextValue, SetHighlightThisReplyTextValue] =
        useState("");
    const [hovering, SetHovering] = useState(false);
    const [mouseCord, SetMouseCord] = useState({ x: 0, y: 0 });
    const [hoveringTime, setHoveringTime] = useState(false);
    const [hoveringLastReply, setHoveringLastReply] = useState(false);
    const [bked, Setbked] = useState(false);
    const [unbked, SetUnbked] = useState("");

    const handleMouseMove = (e: { screenX: any; clientY: number }) => {
        SetMouseCord({ x: e.screenX, y: e.clientY + window.pageYOffset });
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
    function handlePostReplyPopUp() {
        SetClickedPostReply(!clickedPostReply);
        SetClickedReplytoReply(false);
        SetReplyTextareaInput("");
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
            <a
                className="HyperText"
                onClick={handleClickRevealThread}
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
            </Link>{" "}
            <div
                style={{ float: "left" }}
                // onClick={() => {
                //     Setbked(!bked);
                //     if (!bked) {
                //         props.bkcopy.push({ threadID: props.ID });
                //     } else {
                //         SetUnbked(props.ID);
                //         for (let i = 0; i < props.bkcopy.length; i++) {
                //             if (unbked == props.bkcopy[i].threadID) {
                //                 props.bkcopy.splice(i, 1);
                //             }
                //         }
                //         props.bkcopy.pop();
                //     }

                //     console.log(props.bkcopy);
                // }}
            >
                {" "}
                {/* {props.isPinned == 1 ? (
                    <AiFillPushpin size={35} className="HyperText" />
                ) : (
                    <></>
                )} */}
                {bked ? (
                    <>
                        <AiFillStar size={25} className="HyperText" />
                    </>
                ) : (
                    <>
                        <AiOutlineStar size={25} className="HyperText" />
                    </>
                )}
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
                                href={props.image}
                                target="_blank"
                                style={{ fontSize: "smaller" }}
                            >
                                {props.image}
                            </a>
                            <img
                                style={{
                                    cursor: "pointer",
                                    width: clickedThreadImage ? "30%" : "15%",
                                }}
                                src={props.image}
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
export default Thread;
