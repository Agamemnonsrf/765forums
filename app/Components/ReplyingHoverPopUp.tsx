import React, { useRef } from "react";
import { completeId } from "../Utils/utils";
import { ThreadReplyI } from "../Utils/interfaces";

interface Props {
    highlightThisReply: number;
    replies?: ThreadReplyI[];
    mouseCord: { x: number; y: number };
}

export default function ReplyingHoverPopUp(props: Props) {
    const reply = props.replies?.filter(
        (reply: ThreadReplyI) => reply.reply_id === props.highlightThisReply
    )[0];

    //useRef
    const heightRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={heightRef}
            className="ThreadReply"
            style={{
                position: "absolute",
                top:
                    props.mouseCord.y -
                    (heightRef.current?.clientHeight || 0) +
                    "px",
                left: props.mouseCord.x + "px",

                display: props.highlightThisReply ? "inline" : "none",
                maxWidth: "300px",
            }}
        >
            <div style={{ display: "flex", flexDirection: "row" }}>
                <a
                    className="HyperTextnoHover"
                    style={{ fontSize: "small", float: "left" }}
                >
                    ID:&nbsp;{completeId(props.highlightThisReply)}
                </a>
            </div>{" "}
            <span style={{ fontFamily: "monospace", fontSize: "larger" }}>
                {reply?.content}
            </span>
        </div>
    );
}
