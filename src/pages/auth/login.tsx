import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      Belum punya akun? <Link href="/auth/register">Register</Link>
    </div>
  );
};

export default LoginPage;
