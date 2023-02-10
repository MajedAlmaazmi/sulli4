import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function ({ release }) {
  console.log(release);
  return (
    <div>
      {release.pages.map((page) => {
        return page.s3Key;
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
