import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useGetPicturesQuery } from "../store/services/picsum";
import { useRouter } from "next/dist/client/router";
import { Button } from "../components/Button";

const Home: NextPage = () => {
  const router = useRouter();
  const currentPage = +(router.query["page"] || 1);
  const { data, error } = useGetPicturesQuery(currentPage);

  const setCurrentPage = (page: number) => {
    router.push(`/?page=${page}`, undefined, { shallow: true });
  };

  return (
    <div>
      <Head>
        <title>Photo Editor</title>
        <meta name="description" content="Cool photo editor with canvas API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-xl mx-auto">
        <div className="p-20 flex flex-col items-center justify-center">
          <h5 className="text-xl font-normal text-green-400">Step 1</h5>
          <h1 className="text-5xl font-sans font-thin">Select an image</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-min">
          {data?.map((image) => (
            <div
              className="group flex flex-col m-5 cursor-pointer rounded hover:shadow-md transition-shadow"
              key={image.id}
            >
              <div className="h-64 w-full relative">
                <Image
                  src={image.download_url}
                  className="rounded-t"
                  alt={`Photo created by ${image.author}`}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`https://picsum.photos/id/${image.id}/10/10`}
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <label className="py-2 text-1xl font-medium text-center bg-gray-200 rounded-b cursor-pointer group-hover:bg-green-400 transition-colors">
                {image.author}
              </label>
            </div>
          ))}
        </div>
        {error && (
          <h1 className="text-xl text-center text-red-400">
            Something went wrong. Please try refreshing the page.
          </h1>
        )}
        <div className="py-5 flex items-center justify-center">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            text={"Previous"}
            className="mr-2"
          />
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={false}
            text={"Next"}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
