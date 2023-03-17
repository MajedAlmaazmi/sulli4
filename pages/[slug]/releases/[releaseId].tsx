import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function ({ release }) {
  return (
    <div>
      {release.pages.map((page) => {
        return <img src={`https://sulli1.s3.amazonaws.com/${page.s3Key}`} />;
      })}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { releaseId } = query;
  const release = await prisma.release.findUnique({
    where: {
      id: parseInt(releaseId),
    },
    include: {
      pages: true,
      comic: true,
    },
  });
  return {
    props: { release },
  };
}
