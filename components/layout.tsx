export default function Layout({ children }) {
  return (
    <div>
      <header className="mb-8 ">
        <div className="container mx-auto px-2">
          <h1 className="text-4xl py-4 font-bold">
            <Link href="">Sulli</Link>
            </h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
