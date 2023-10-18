"use client";
import React from "react";
import { getThread } from "../../Utils/api-utils";
import { usePathname } from "next/navigation";

import { ThreadI, ThreadIfb } from "../../Utils/interfaces";

import "/public/App.css";
import Thread from "@/app/Components/Thread";
import { decideTime } from "@/app/Utils/utils";

function ThreadPage() {
    const pathname = parseInt(usePathname().split("/")[2]);
    const [thread, setThread] = React.useState<ThreadI>({} as ThreadI);
    const [lastUpdate, setLastUpdate] = React.useState("");

    React.useEffect(() => {
        if (!thread.thread_id) {
            getThread(pathname).then((data) => {
                setThread(data as ThreadI);
                setLastUpdate(new Date().toLocaleTimeString());
            });
        }
    }, []);

    return (
        <>
            <div style={{ padding: "15px", marginBottom: "10px" }}>
                {thread.thread_id && (
                    <Thread
                        replies={thread?.replies}
                        thread_id={thread.thread_id}
                        body={thread.body}
                        title={thread.title}
                        created_at={thread.created_at}
                        last_updated={thread.last_updated}
                        image={thread?.image ?? ""}
                        setThread={setThread}
                        setLastUpdate={setLastUpdate}
                        singleThread={true}
                    />
                )}
            </div>
            <footer
                style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "rgb(35,35,35)",
                    padding: "5px",
                    fontWeight: "bolder",
                    color: "rgb(172, 172, 172)",
                }}
            >
                Last Update: {lastUpdate}
            </footer>
        </>
    );
}

export default ThreadPage;
