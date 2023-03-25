import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Comics } from "../types";
import Layout from "../components/layout";
const prisma = new PrismaClient();

export default function Home({ comics }: Comics) {
  return (
    <div className="min-h-screen bg-amber-100">
      <Layout>
        <div className="container mx-auto px-2">
          <h2 className="text-xl mb-2  ">كافة الأعمال</h2>

          <ul>
            {comics.map(({ id, title, slug }) => {
              return (
                <li
                  className="mb-6 border border-black border-2 rounded overflow-hidden   bg-amber-50 drop-shadow-md"
                  key={id}
                >
                  <Link href={slug}>
                    <div className="aspect-video">
                      <img
                        className="object-fill w-full h-full"
                        src="https://upload.wikimedia.org/wikipedia/en/f/f5/Killing_Stalking.jpg"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-lg py-4 mr-2 font-bold text-pink-300">
                        {title}
                      </h3>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const comics = await prisma.comic.findMany();
  return {
    props: {
      comics,
    },
  };
}
