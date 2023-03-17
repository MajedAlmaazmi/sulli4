import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Comic } from "../../types";

interface Props {
  comic: Comic;
}
const prisma = new PrismaClient();

export default function Home({ comic }: Props) {
  return (
    <div>
      <h1>{comic.title}</h1>
      <h2>Releases</h2>
      <ul>
        {comic.releases.map((release) => {
          return (
            <li>
              <Link href={`${comic.slug}/releases/${release.id}`}>
                {release.title}
              </Link>
            </li>
          );
        })}
      </ul>
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
  return {
    props: { comic },
  };
}
