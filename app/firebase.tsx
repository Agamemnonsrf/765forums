// import {
//     getFirestore,
//     collection,
//     getDocs,
//     collectionGroup,
//     addDoc,
//     setDoc,
//     doc,
//     getDoc,
//     query,
//     orderBy,
//     limit,
//     limitToLast,
// } from "firebase/firestore/lite";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import {
//     ThreadI,
//     ThreadIfb,
//     ThreadReplyI,
//     ThreadSkeletonI,
// } from "./interfaces";
// import { initializeApp } from "firebase/app";
// import { useState } from "react";
// const firebaseConfig = {
//     apiKey: "AIzaSyDGPPbi4rVFbLBfW3qloBsN2tWJAsHAnMQ",
//     authDomain: "forums-555d3.firebaseapp.com",
//     projectId: "forums-555d3",
//     storageBucket: "forums-555d3.appspot.com",
//     messagingSenderId: "339193271371",
//     appId: "1:339193271371:web:febe1ce8b66d993eade9ce",
//     measurementId: "G-8XYQR3P4LQ",
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const getThreads = async () => {
//     const threadscol = collection(db, "threads");
//     const threadsnap = await getDocs(threadscol);

//     const threadsList = await Promise.all(
//         threadsnap.docs.map(async (doc) => {
//             const repliesnap = await getDocs(
//                 query(
//                     collection(doc.ref, "replies"),
//                     orderBy("replytime", "asc"),
//                     limitToLast(5)
//                 )
//             );
//             const replieslist: ThreadReplyI[] = repliesnap.docs.map(
//                 (doc) =>
//                     ({
//                         ...doc.data(),
//                         id: doc.id,
//                     } as ThreadReplyI)
//             );

//             return {
//                 ...doc.data(),
//                 id: doc.id,
//                 replies: replieslist,
//             };
//         })
//     );
//     return threadsList;
// };
// const getThread = async (id: string) => {
//     const docRef = doc(db, "threads", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         const repliesnap = await getDocs(
//             query(
//                 collection(docSnap.ref, "replies"),
//                 orderBy("replytime", "asc")
//             )
//         );
//         const replieslist: ThreadReplyI[] = repliesnap.docs.map(
//             (doc) =>
//                 ({
//                     ...doc.data(),
//                     id: doc.id,
//                 } as ThreadReplyI)
//         );
//         const completeThread = {
//             ...docSnap.data(),
//             id: id,
//             replies: replieslist,
//         };
//         return completeThread;
//     } else {
//         console.log("No such document!");
//     }
// };

// const usePostReply = (): PostReplyI => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);

//     const postReply = async (reply: ThreadReplyI, threadId: string) => {
//         setIsLoading(true);
//         try {
//             const replyRef = collection(db, "threads", threadId, "replies");
//             const docRef = await addDoc(replyRef, reply);
//             console.log("Document written with ID: ", docRef.id);
//             setSuccess(true);
//         } catch (e) {
//             setError("Error");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { isLoading, error, success, setSuccess, postReply };
// };

// interface PostReplyI {
//     isLoading: boolean;
//     error: any;
//     success: boolean;
//     setSuccess: (success: boolean) => void;
//     postReply: (reply: ThreadReplyI, threadId: string) => void;
// }

// interface PostThreadI {
//     isLoading: boolean;
//     error: any;
//     success: boolean;
//     postThread: (thread: ThreadSkeletonI, image?: threadImage) => void;
// }

// interface threadImage {
//     imageUrl: string;
//     file: File;
// }

// const usePostThread = (): PostThreadI => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);

//     const postThread = async (
//         thread: ThreadSkeletonI,
//         threadImage: threadImage = { imageUrl: "", file: new File([], "") }
//     ) => {
//         setIsLoading(true);
//         try {
//             if (threadImage.file) {
//                 console.log(thread);
//                 const storage = getStorage();
//                 const storageRef = ref(
//                     storage,
//                     "threadImages/" + threadImage.file.name + "-" + Date.now()
//                 );
//                 await uploadBytes(storageRef, threadImage.file);
//                 const url = await getDownloadURL(storageRef);
//                 thread.imageUrl = url;
//                 console.log(thread.imageUrl);
//                 if (!thread.imageUrl) throw new Error("No image url");
//                 console.log(thread.imageUrl);
//             }
//             const docRef = await addDoc(collection(db, "threads"), thread);
//             setSuccess(true);
//             console.log("Document created with ID:", docRef.id);
//         } catch (error) {
//             console.log("Error adding document: ", error);
//             setError("error");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { isLoading, error, success, postThread };
// };

// export {
//     db,
//     app,
//     collection,
//     getDocs,
//     collectionGroup,
//     getThreads,
//     usePostThread,
//     getThread,
//     usePostReply,
// };
