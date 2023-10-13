import React from "react";
import { completeId } from "../utils";
import { ThreadReplyI } from "../Utils/interfaces";

export default function ReplyingHoverPopUp(props: any) {
    //use state that holds the reply text value, it is set in a useffect that runs when the mouse is hovering over a reply, it uses props.highlightThisReply and searches for it in the replies array amd sets the reply text value to the reply text value of the reply that has the same id as props.highlightThisReply
    //
    console.log();
    return (
        <div
            className="ThreadReply"
            style={{
                position: "absolute",
                top: props.mouseCord.y + "px",
                left: props.mouseCord.x + "px",
                display: props.highlightThisReply ? "inline" : "none",
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
            {
                props.replies?.filter(
                    (reply: ThreadReplyI) =>
                        reply.reply_id === props.highlightThisReply
                )[0]?.content
            }
        </div>
    );
}
