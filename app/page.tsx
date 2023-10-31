"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "/public/App.css";
import { getThreadPreviews } from "./Utils/api-utils";
import { ThreadPreviewI } from "./Utils/interfaces";
import { completeId } from "./Utils/utils";
interface Board {
    id: number;
    name: string;
    description: string;
    short_name: string;
}

const boards: Board[] = [
    {
        id: 0,
        name: "Technology",
        description:
            "Discussions on the latest tech trends, gadgets, and software.",
        short_name: "tech",
    },
    {
        id: 1,
        name: "Politics",
        description: "Political discussions and current events.",
        short_name: "polt",
    },
    {
        id: 2,
        name: "Fitness",
        description:
            "Discussions on health, fitness routines, and healthy living.",
        short_name: "fit",
    },
    {
        id: 3,
        name: "Outdoors",
        description: "Hiking, camping, and other outdoor activities.",
        short_name: "out",
    },
    {
        id: 4,
        name: "Entertainment",
        description:
            "Movie reviews, TV shows, music, and pop culture discussions.",
        short_name: "entm",
    },
    {
        id: 5,
        name: "Science",
        description:
            "Scientific discoveries, educational resources, and academic topics.",
        short_name: "sci",
    },
    {
        id: 6,
        name: "Literature",
        description:
            "Book recommendations, reading lists, and literature discussions.",
        short_name: "lit",
    },
    {
        id: 7,
        name: "Gaming",
        description: "Video games, esports events, and gaming strategies.",
        short_name: "game",
    },
    {
        id: 8,
        name: "Art",
        description:
            "Showcasing artwork, creative projects, and discussions on artistic pursuits.",
        short_name: "art",
    },

    {
        id: 9,
        name: "News",
        description:
            "Discussions about the latest news, politics, and global events.",
        short_name: "news",
    },
];

const BoardCard: React.FC<Board> = (props) => {
    const [threadPreviews, setThreadPreviews] = React.useState<
        ThreadPreviewI[]
    >([]);
    const [errorLoadingPreviews, setErrorLoadingPreviews] =
        React.useState(false);
    const [totalThreadCount, setTotalThreadCount] = React.useState(0);

    useEffect(() => {
        getThreadPreviews(props.short_name)
            .then((data) => {
                setThreadPreviews(data.slice(0, 5));
                console.log(data);
                setTotalThreadCount(data.length);
            })
            .catch((err) => {
                setErrorLoadingPreviews(true);
            });
    }, []);

    const excessThreads = totalThreadCount - threadPreviews.length;

    return (
        <div
            style={{
                height: "400px",
                padding: "10px",
                margin: "5px",
                backgroundColor: "rgb(25, 25, 25)",
                width: "18%",
            }}
        >
            <h2
                className="HyperTextnoHover"
                style={{
                    backgroundColor: "rgb(56, 56, 56)",
                    textAlign: "center",
                    padding: "5px",
                }}
            >
                {props.name}
            </h2>
            {/* <p>{props.description}</p> */}
            <ul
                style={{
                    backgroundColor: "rgb(56, 56, 56)",
                    height: "70%",
                    padding: "0",
                }}
            >
                {errorLoadingPreviews
                    ? "error"
                    : threadPreviews.map((thread) => (
                          <Link
                              href={`/${props.short_name}/${thread.thread_id}`}
                              className="HyperText"
                              style={{
                                  textDecoration: "none",
                                  margin: "0",
                                  height: "20%",
                              }}
                              key={thread.thread_id}
                          >
                              <li
                                  key={thread.thread_id}
                                  style={{
                                      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                      padding: "10px",
                                      margin: "5px",
                                      backgroundColor: "rgb(26, 26, 26)",
                                      listStyle: "none",
                                      cursor: "pointer",

                                      height: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "start",
                                      justifyContent: "center",
                                      textOverflow: "ellipsis ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                  }}
                              >
                                  <span
                                      className="HyperTextnoHover"
                                      style={{
                                          fontSize: "0.7em",
                                      }}
                                  >
                                      ID: {completeId(thread.thread_id)} |{" "}
                                      {thread.reply_count} Replies
                                  </span>{" "}
                                  <span
                                      style={{
                                          margin: "0 2px 2px 2px",
                                          fontSize: "1.2em",
                                      }}
                                  >
                                      {thread.title}
                                  </span>
                              </li>
                          </Link>
                      ))}
            </ul>
            <Link
                className="HyperText"
                style={{
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    padding: "10px",
                    margin: "5px",
                    backgroundColor: "rgb(56, 56, 56)",
                    cursor: "pointer",
                    fontSize: "1.1em",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    height: "10%",
                }}
                href={`/${props.short_name}`}
            >
                {excessThreads == 0
                    ? `View threads in /${props.short_name}/`
                    : `View ${excessThreads} more threads in /${props.short_name}/`}
            </Link>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <div>
            <h2
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                    fontSize: "2.2em",
                }}
                className="HyperTextnoHover"
            >
                Discussion Boards
            </h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                }}
            >
                {boards.map((board) => (
                    <BoardCard key={board.id} {...board} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
