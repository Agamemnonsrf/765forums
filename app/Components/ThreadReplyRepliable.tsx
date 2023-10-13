"use client";
import React from "react";
import { ThreadReplyI } from "../Utils/interfaces";
import ReplyingHoverPopUp from "./ReplyingHoverPopUp";
import { adjustTZ, completeId } from "../utils";

interface ExtendedThreadReplyI extends ThreadReplyI {
    highlightThisReply: number;
    SetHighlightThisReply: (value: number) => void;
    highlightThisReplyTextValue: string;
    SetHighlightThisReplyTextValue: (value: string) => void;
    SetHighlightThread: (value: boolean) => void;
    SetHovering: (value: boolean) => void;
    handleMouseMove: (screenX: number, clientY: number) => void;
    mouseCord: { x: number; y: number };
    hovering: boolean;
    threadId: number;
    clickedReplytoReply: boolean;
    SetClickedReplytoReply: (value: boolean) => void;
    SetClickedPostReply: (value: boolean) => void;
    SetReplytoReplyto: (value: number) => void;
    replies?: ThreadReplyI[];
}

export default function ThreadReply(props: ExtendedThreadReplyI) {
    const local_created_at = adjustTZ(new Date(props.created_at));

    return (
        <li
            style={{
                backgroundColor:
                    props.reply_id === props.highlightThisReply
                        ? "rgb(79, 78, 78)"
                        : "rgb(59, 58, 58)",
                transition: ".2s",
                transitionTimingFunction: "ease-out",
            }}
            className="ThreadReply"
            key={props.reply_id}
            id={props.reply_id.toString()}
        >
            {" "}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "-20px -20px 0px -20px",
                    backgroundColor: "rgb(25, 25, 25)",
                }}
            >
                <a
                    className="HyperText"
                    style={{
                        fontSize: "small",
                    }}
                    onClick={() => {
                        props.SetClickedPostReply(!props.clickedReplytoReply);
                        if (props.clickedReplytoReply) {
                            props.SetReplytoReplyto(0);
                            props.SetClickedReplytoReply(false);
                        } else {
                            props.SetReplytoReplyto(props.reply_id);
                            props.SetClickedReplytoReply(true);
                        }
                    }}
                >
                    [Reply]
                </a>{" "}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <a
                    className="HyperTextnoHover"
                    style={{ fontSize: "smaller", float: "left" }}
                >
                    ID: {completeId(props.reply_id)}
                </a>
                <a
                    style={{ fontSize: "smaller", float: "left" }}
                    className="HyperTextnoHover"
                >
                    {local_created_at.toISOString().split("T")[0]}/
                    {local_created_at.toISOString().split("T")[1].split(".")[0]}
                </a>
                <a
                    href={
                        props.replying_to
                            ? `${props.thread_id}/reply/${props.replying_to}`
                            : `${props.thread_id}`
                    }
                    className="HyperText"
                    style={{ fontSize: "smaller" }}
                    onClick={(e) => {
                        if (props.replying_to) {
                            e.preventDefault();
                            const element = document.getElementById(
                                props.replying_to.toString()
                            );
                            if (element !== null) {
                                element.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                            props.SetHighlightThisReply(props.replying_to);
                        } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                    onMouseEnter={() => {
                        if (props.replying_to) {
                            props.SetHighlightThisReply(props.replying_to);
                        }
                    }}
                    onMouseLeave={() => {
                        if (props.replying_to) {
                            props.SetHighlightThisReply(0);
                        }
                    }}
                    onMouseMove={(e) =>
                        props.handleMouseMove(e.screenX, e.clientY)
                    }
                >
                    Replying to:{" "}
                    {props.replying_to
                        ? completeId(props.replying_to)
                        : `${completeId(props.thread_id)} (OP)`}
                    <br />
                </a>{" "}
            </div>
            <div style={{ fontSize: "large", fontFamily: "monospace" }}>
                {props.content}
            </div>
            {props.replying_to && (
                <ReplyingHoverPopUp
                    mouseCord={props.mouseCord}
                    hovering={props.hovering}
                    replyingtoTextValue={props.content}
                    key={props.reply_id}
                    highlightThisReply={props.highlightThisReply}
                    highlightThisReplyTextValue={
                        props.highlightThisReplyTextValue
                    }
                    replies={props.replies}
                />
            )}
        </li>
    );
}
