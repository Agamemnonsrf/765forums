"use client";
import { FiX } from "react-icons/fi";
import Draggable from "react-draggable";
import React, { useContext } from "react";
import { ThreadI, ThreadReplyI } from "../Utils/interfaces";
import { TestContext } from "../Utils/context";
//import { usePostReply } from "../firebase";
import { getThread, usePostReply } from "../Utils/api-utils";
import { completeId } from "../Utils/utils";

interface Props {
    clickedPostReply: boolean;
    SetClickedPostReply: (clickedPostReply: boolean) => void;
    replyTextareaInput: string;
    SetReplyTextareaInput: (replyTextareaInput: string) => void;
    handleReplyTextareaChange: (event: string) => void;
    clickedReplytoReply: boolean;
    SetClickedReplytoReply: (clickedReplytoReply: boolean) => void;
    threadID: number;
    ReplytoReplyto: number;
    setThread: React.Dispatch<React.SetStateAction<ThreadI>>;
    setLastUpdate: React.Dispatch<React.SetStateAction<string>>;
}

function PostReplyPopUp(props: Props) {
    const { isLoading, error, success, setSuccess, postReply, setError } =
        usePostReply();
    const [highlightEmptyField, SetHighlightEmptyField] = React.useState(false);

    React.useEffect(() => {
        if (success) {
            getThread(props.threadID).then((thread) => {
                props.setThread(thread);
                closePostReply();
                setSuccess(false);
                props.setLastUpdate(new Date().toLocaleTimeString());
            });
        }
    }, [success]);

    function closePostReply() {
        props.SetClickedPostReply(false);
        props.SetClickedReplytoReply(false);
        props.SetReplyTextareaInput("");
        SetHighlightEmptyField(false);
        setError("");
    }

    return (
        <Draggable handle=".ThreadModalTopBar">
            <div
                style={{
                    display:
                        props.clickedPostReply || props.clickedReplytoReply
                            ? "block"
                            : "none",
                }}
            >
                <div
                    className="ThreadTypeWindow"
                    style={{ position: "fixed", textAlign: "center" }}
                >
                    <div className="ThreadModalTopBar" id="topbar">
                        <a className="HyperText" onClick={closePostReply}>
                            <FiX size={25} />
                        </a>
                    </div>
                    <a
                        className="HyperText"
                        style={{ cursor: "auto", margin: "10px" }}
                    >
                        Reply to:{" "}
                        {props.clickedReplytoReply
                            ? completeId(props.ReplytoReplyto)
                            : `${completeId(props.threadID)} (OP)`}
                    </a>
                    <textarea
                        className="ThreadInputArea"
                        style={{
                            backgroundColor: highlightEmptyField
                                ? "rgba(66, 25, 25,0.5)"
                                : "rgb(66, 64, 64)",
                        }}
                        value={props.replyTextareaInput}
                        onChange={(event) =>
                            props.handleReplyTextareaChange(event.target.value)
                        }
                    ></textarea>
                    {isLoading ? (
                        <h2
                            className="HyperText"
                            style={{ textAlign: "center" }}
                        >
                            Posting...
                        </h2>
                    ) : (
                        <h2
                            className="HyperText"
                            style={{ textAlign: "center" }}
                            onClick={() => {
                                const date = new Date();

                                date.setTime(
                                    date.getTime() +
                                        (date.getTimezoneOffset() / -60) *
                                            60 *
                                            60 *
                                            1000
                                );

                                if (props.replyTextareaInput !== "") {
                                    const reply: ThreadReplyI = {
                                        content: props.replyTextareaInput,
                                        reply_id: 0,
                                        thread_id: props.threadID,
                                        created_at: new Date()
                                            .toISOString()
                                            .slice(0, 19)
                                            .replace("T", " "),
                                        replying_to: props.clickedReplytoReply
                                            ? props.ReplytoReplyto
                                            : null,
                                    };
                                    postReply(reply);
                                } else {
                                    SetHighlightEmptyField(true);
                                }
                            }}
                        >
                            [Submit]
                        </h2>
                    )}
                    <h3
                        style={{
                            backgroundColor: "rgba(255,50,50,0.7)",
                            textAlign: "center",
                        }}
                    >
                        {error && error}
                    </h3>
                </div>
            </div>
        </Draggable>
    );
}

export default PostReplyPopUp;
