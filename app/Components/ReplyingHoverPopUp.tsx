import React from "react";

export default function ReplyingHoverPopUp(props: any) {
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
                    Poster:&nbsp;|
                </a>
                <a
                    className="HyperTextnoHover"
                    style={{ fontSize: "small", float: "left" }}
                >
                    ID:&nbsp;{props.highlightThisReply}
                </a>
            </div>{" "}
            {props.highlightThisReplyTextValue}
        </div>
    );
}
