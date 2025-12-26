import Head from "next/head";
import { useAppSelector } from "@/store";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import styles from "@/styles/Components.module.css";

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Head>
        <title>Redux Saga Interview Sample</title>
        <meta name="description" content="Redux Toolkit + Saga sample project for interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {!isAuthenticated ? (
          <LoginForm />
        ) : (
          <div className={styles.layout}>
            <ProductList />
            <Cart />
          </div>
        )}
      </main>
    </>
  );
}
