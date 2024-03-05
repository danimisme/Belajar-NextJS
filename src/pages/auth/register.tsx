import Link from "next/link";
const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      Sudah punya akun? <Link href="/auth/login">Login</Link>
    </div>
  );
};

export default RegisterPage;
