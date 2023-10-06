"use client";
import React from "react";
import { ThreadReplyI } from "../interfaces";
import ReplyingHoverPopUp from "./ReplyingHoverPopUp";
import { adjustTZ, completeId } from "../utils";

interface ExtendedThreadReplyI extends ThreadReplyI {
    highlightThisReply: string;
    SetHighlightThisReply: (value: string) => void;
    highlightThisReplyTextValue: string;
    SetHighlightThisReplyTextValue: (value: string) => void;
    SetHighlightThread: (value: boolean) => void;
    SetHovering: (value: boolean) => void;
    handleMouseMove: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    mouseCord: { x: number; y: number };
    hovering: boolean;
    threadId: number;
    replies?: ThreadReplyI[];
}

export default function ThreadReply(props: ExtendedThreadReplyI) {
    const local_created_at = adjustTZ(new Date(props.created_at));

    return (
        <li
            style={{
                // backgroundColor:
                //     props.ID == highlightThisReply
                //         ? "rgb(79, 78, 78)"
                //         : "rgb(59, 58, 58)",
                transition: ".2s",
                transitionTimingFunction: "ease-out",
            }}
            className="ThreadReply"
            key={props.reply_id}
            //id={props.thread_id}
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
                <div
                    style={{
                        backgroundColor: "rgb(22, 22, 22)",
                        borderBottom: "1px solid rgb(12, 12, 12)",
                    }}
                ></div>{" "}
                {/* <ul
            style={{
                listStyleType: "none",
                float: "left",
            }}
        >
            {Threads[props.itemkey].ThreadReplies[
                reply.key
            ].repliestoThisReply.map((rep) => (
                <div key={rep.repID}>
                    <li
                        onMouseEnter={() => {
                            props.SetHighlightThisReply(rep.repID);
                            props.SetHighlightThisReplyTextValue(rep.repVal);
                            SetHovering(true);
                        }}
                        onMouseLeave={() => {
                            props.SetHighlightThisReply("");
                            props.SetHighlightThisReplyTextValue("");
                            SetHovering(false);
                        }}
                        onMouseMove={handleMouseMove}
                        style={{
                            display: rep.repID == "" ? "none" : "block",
                            float: "left",
                            fontSize: "smaller",
                        }}
                    >
                        {" "}
                        <a className="HyperText">
                            {">>"}
                            {rep.repID}
                        </a>
                    </li>{" "}
                </div>
            ))}
        </ul> */}
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
                            props.SetHighlightThisReply(
                                props.replying_to.toString()
                            );
                        }
                    }}
                    // onMouseEnter={
                    //     !props.replyingtoReply
                    //         ? () => props.SetHighlightThread(true)
                    //         : () => {
                    //               props.SetHighlightThisReply(props.replyingto);
                    //               props.SetHighlightThisReplyTextValue(
                    //                   props.replyingtoTextValue
                    //               );
                    //               props.SetHovering(true);
                    //           }
                    // }
                    // onMouseLeave={
                    //     !props.replyingtoReply
                    //         ? () => props.SetHighlightThread(false)
                    //         : () => {
                    //               props.SetHighlightThisReply("");
                    //               props.SetHighlightThisReplyTextValue("");
                    //               props.SetHovering(false);
                    //           }
                    // }
                    onMouseMove={() => props.handleMouseMove}
                >
                    Replying to:{" "}
                    {props.replying_to
                        ? completeId(props.replying_to)
                        : `${completeId(props.threadId)} (OP)`}
                    <br />
                </a>{" "}
            </div>
            <div style={{ fontSize: "large", fontFamily: "monospace" }}>
                {props.content}
            </div>
            <ReplyingHoverPopUp
                mouseCord={props.mouseCord}
                hovering={props.hovering}
                //replyingtoTextValue={props.replyingtoTextValue}
                key={props.reply_id}
                highlightThisReply={props.highlightThisReply}
                highlightThisReplyTextValue={props.highlightThisReplyTextValue}
            />
        </li>
    );
}
