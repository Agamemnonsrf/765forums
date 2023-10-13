"use client";
import {
    BsLayoutSidebar,
    BsLayoutSplit,
    BsLayoutThreeColumns,
} from "react-icons/bs";
import CreateThreadPopUp from "./CreateThreadPopUp";
import { useContext } from "react";
import { TestContext } from "../Utils/context";
import React from "react";

export default function SubHeader() {
    const {
        handleCreateThreadPopup,
        threadLayout,
        SetThreadLayout,
        SetClickedHideThreads,
        clickedHideThreads,
    } = useContext(TestContext);
    return (
        <div className="SubHeader">
            <CreateThreadPopUp />

            <a
                onClick={handleCreateThreadPopup}
                className="HyperText"
                style={{
                    position: "absolute",
                    left: "0",
                    marginLeft: "15px",
                }}
            >
                [Create Thread]
            </a>
            <div className="dropdown">
                <a className="HyperText dropdownParent">[Change Layout]</a>
                <div className="dropdownContent">
                    <a
                        className="HyperText dropdownOption"
                        style={{
                            transform: "rotate(90deg)",
                            backgroundColor:
                                threadLayout == 1
                                    ? "rgb(76, 76, 76)"
                                    : "rgb(56, 56, 56)",
                        }}
                        onClick={() => SetThreadLayout(1)}
                    >
                        <BsLayoutSidebar size={20} />
                    </a>
                    <a
                        className="HyperText dropdownOption"
                        onClick={() => SetThreadLayout(2)}
                        style={{
                            backgroundColor:
                                threadLayout == 2
                                    ? "rgb(76, 76, 76)"
                                    : "rgb(56, 56, 56)",
                        }}
                    >
                        <BsLayoutSplit size={20} />
                    </a>
                    <a
                        className="HyperText dropdownOption"
                        onClick={() => SetThreadLayout(3)}
                        style={{
                            backgroundColor:
                                threadLayout == 3
                                    ? "rgb(76, 76, 76)"
                                    : "rgb(56, 56, 56)",
                        }}
                    >
                        <BsLayoutThreeColumns size={20} />
                    </a>
                </div>
            </div>
            <a
                className="HyperText"
                onClick={() => SetClickedHideThreads(!clickedHideThreads)}
            >
                {clickedHideThreads ? "[Reveal Threads]" : "[Collapse Threads]"}
            </a>
            <a
                className="HyperText"
                style={{
                    textDecoration: "none",
                    display: "inline-block",
                }}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                [Scroll to Top]
            </a>
            <a
                className="HyperText"
                onClick={() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                    });
                }}
            >
                [Scroll to Bottom]
            </a>
        </div>
    );
}
