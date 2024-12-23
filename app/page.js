import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1>Hello Bloggers !</h1>
        <button className="text-2xl border border-white p-2 rounded-md hover:bg-white hover:text-black">
          {" "}
          <a href="/register">Start writing a blog</a>{" "}
        </button>
        <button className="text-2xl border border-white p-2 rounded-md hover:bg-white hover:text-black">
          <a href="/home">Read blogs</a>
        </button>
      </main>
    </div>
  );
}
