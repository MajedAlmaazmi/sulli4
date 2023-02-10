import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Comic } from "../../types";

const prisma = new PrismaClient();

export default function Home({ comic }: Comic) {
  return (
    <div>
      <h1>{comic.title}</h1>
      <h2>Releases</h2>
      {comic.releases.map((release) => {
        return (
          <h3>
            <Link href={`${comic.slug}/releases/${release.id}`}>
              {release.title}
            </Link>
          </h3>
        );
      })}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const comic = await prisma.comic.findUnique({
    where: {
      slug,
    },
    include: {
      releases: true,
    },
  });
  console.log(comic);
  return {
    props: { comic },
  };
}
