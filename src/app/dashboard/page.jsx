"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Dashboard = () => {
  const { data: session, status } = useSession(); // Ensuring stability
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  // Fetch data using SWR
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    session?.user?.name ? `http://localhost:3000/api/posts?username=${session.user.name}` : null,
    fetcher
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  // Handle file selection (image)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const imageRef = ref(storage, `blogImages/${Date.now() + file.name}`);
      const metadata = { customMetadata: { timestamp: new Date().toISOString() } };

      try {
        await uploadBytes(imageRef, file, metadata);
        const downloadURL = await getDownloadURL(imageRef);
        setUrl(downloadURL);

        const title = e.target[0].value;
        const desc = e.target[1].value;
        const content = e.target[2].value;

        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc,
            img: downloadURL,
            content,
            username: session.user.name,
          }),
        });

        mutate(); // Refresh posts
        e.target.reset();
        setFile(null);
      } catch (err) {
        console.error("Error uploading image or creating post:", err);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  const handleDelete = async (id, username) => {
    if (username === session.user.name) {
      try {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        mutate();
        alert("The Blog has been deleted");
      } catch (err) {
        console.log("Error deleting post:", err);
      }
    } else {
      alert("You can only delete your own posts.");
    }
  };

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "authenticated" ? (
        <>
          <div className={styles.posts}>
            {isLoading ? (
              "Loading posts..."
            ) : (
              data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt={post.title} width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id, post.username)}
                  >
                    X
                  </span>
                </div>
              ))
            )}
          </div>

          <form className={styles.new} onSubmit={handleSubmit}>
            <h1>Add New Post</h1>
            <input type="text" placeholder="Title" className={styles.input} />
            <input type="text" placeholder="Desc" className={styles.input} />
            <textarea
              placeholder="Content"
              className={styles.textArea}
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              className={styles.input}
              onChange={handleFileChange}
            />
            <button className={styles.button}>Send</button>
          </form>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default Dashboard;
