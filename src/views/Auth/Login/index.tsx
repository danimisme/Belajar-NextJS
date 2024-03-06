import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const LoginViews = () => {
  const { push } = useRouter();
  const handleLogin = () => {
    push("/product");
  };
  return (
    <div className={styles.login}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <p>
        {" "}
        Belum punya akun? <Link href="/auth/register">Register</Link>{" "}
      </p>
    </div>
  );
};
export default LoginViews;
