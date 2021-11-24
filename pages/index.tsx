import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import {
  Image as PicsumImage,
  useGetPicturesQuery,
} from "../store/services/picsum";
import { useRouter } from "next/dist/client/router";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  const router = useRouter();
  const currentPage = +(router.query["page"] || 1);
  const { data, error } = useGetPicturesQuery(currentPage);

  const setCurrentPage = (page: number) => {
    router.push(`/?page=${page}`, undefined, { shallow: true });
  };

  const selectImageToEdit = (image: PicsumImage) => {
    router.push(`/editor?id=${image.id}`);
  };

  return (
    <div>
      <Head>
        <title>Select an Image | Photo Editor</title>
      </Head>
      <main className="max-w-screen-xl mx-auto">
        <Title step={"Step 1"} title={"Select an Image"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-min">
          {data?.map((image) => (
            <div
              className="group flex flex-col m-5 cursor-pointer rounded hover:shadow-md transition-shadow"
              key={image.id}
              onClick={() => selectImageToEdit(image)}
            >
              <div className="h-64 w-full relative">
                <Image
                  src={`https://picsum.photos/id/${image.id}/400`}
                  className="rounded-t"
                  alt={`Photo created by ${image.author}`}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`https://picsum.photos/id/${image.id}/10/10`}
                  objectFit="cover"
                  objectPosition="center"
                  sizes="50wv"
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
