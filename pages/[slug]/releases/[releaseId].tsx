import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import React, { useRef, useEffect, useState } from "react";
import useNativeLazyLoading from "@charlietango/use-native-lazy-loading";
import { useInView } from "react-intersection-observer";

const LazyImage = ({ width, height, src, ...rest }) => {
  const supportsLazyLoading = useNativeLazyLoading();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
    skip: supportsLazyLoading !== false,
  });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        paddingBottom: `${(height / width) * 100}%`,
        background: "#2a4b7a",
      }}
    >
      {inView || supportsLazyLoading ? (
        <img
          {...rest}
          src={src}
          width={width}
          height={height}
          loading="lazy"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      ) : null}
    </div>
  );
};

export default function ({ release }) {
  return (
    <div>
      <div style={{ height: "100vh" }}>hi</div>
      <img
        style={{ width: "100%", maxWidth: "300px", maxHeight: "300px" }}
        src="https://icon-library.com/images/twitter-small-icon/twitter-small-icon-17.jpg"
      />
      {release.pages.map((page) => {
        console.log(page);
        return (
          // <div style={{}}>

          // </div>
          <div style={{ width: "100%", maxWidth: page.weidth }}>
            <LazyImage
              width={page.weidth}
              height={page.height}
              src={`https://sulli1.s3.amazonaws.com/${page.s3Key}`}
            />
          </div>
          // <Image
          //   width={page.width}
          //   height={page.height}
          //   src={`https://sulli1.s3.amazonaws.com/${page.s3Key}`}
          // />
        );
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
