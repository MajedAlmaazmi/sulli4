import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Comics } from "../types";

const prisma = new PrismaClient();

export default function Home({ comics }: Comics) {
  return (
    <div>
      <ul>
        {comics.map(({ id, title, slug }) => {
          return (
            <li key={id}>
              <Link href={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
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
