import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
import Script from "next/script";
import Image from "next/image";
const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div className="big" id="title"></div>
      <Script id="SCRIPT-title" strategy="lazyOnload">
        {`document.getElementById("title").innerHTML = "Navbar"`}
      </Script>
      <div className={styles.profile}>
        {data?.user?.image && (
          <Image
            src={data.user.image}
            alt={data.user.image}
            className={styles.avatar}
            width={30}
            height={30}
          />
          // <img className={styles.avatar} src={data.user.image} alt="" />
        )}
        {data && data.user.fullName} {"  "}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
