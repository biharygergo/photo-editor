import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useImage from "use-image";

import Head from "next/head";
import { useGetPictureQuery } from "../store/services/picsum";
import { Title } from "../components/Title";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/Button";
const ImageEditor = dynamic(() => import("../components/ImageEditor"), {
  ssr: false,
});

const NumberFormControl = (props: {
  id: string;
  value: number;
  setValue: (value: number) => void;
}) => {
  return (
    <input
      id={props.id}
      type="number"
      value={props.value}
      onChange={(e) => props.setValue(+e.target.value)}
      className="rounded border border-green-400 py-2 px-4"
    ></input>
  );
};

const FormLabel = (props: { for: string; text: string }) => {
  return (
    <label htmlFor={props.for} className="font-light mb-2">
      {props.text}
    </label>
  );
};

const FormGroup = (props: { children: React.ReactNode[] }) => (
  <div className="py-2 flex flex-col">{props.children}</div>
);
const Editor: NextPage = () => {
  const router = useRouter();
  const editedImageId = router.query["id"] as string;

  const { data } = useGetPictureQuery(editedImageId || "");
  const [image] = useImage(data?.download_url || "", "anonymous");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageBlur, setImageBlur] = useState<number>(0);
  const [isGrayscaled, setIsGrayscaled] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      setImageWidth(containerRef.current.offsetWidth);
      setImageHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  return (
    <div>
      <Head>
        <title>Edit Image | Photo Editor</title>
      </Head>
      <main>
        <Title step={"Step 2"} title={"Edit Image"} />
        <div className="flex py-10 px-5">
          <div className="flex-auto w-8/12">
            <div
              className="rounded shadow w-full overflow-hidden"
              style={{ height: 600 }}
              ref={containerRef}
            >
              <ImageEditor
                width={imageWidth}
                height={imageHeight}
                image={image}
                isGrayscaled={isGrayscaled}
                blurRadius={imageBlur}
              />
            </div>
          </div>
          <div className="flex-auto w-4/12 flex flex-col px-5">
            <FormGroup>
              <FormLabel for="width" text="Width" />
              <NumberFormControl
                value={imageWidth}
                setValue={setImageWidth}
                id="height"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="height" text="Height" />
              <NumberFormControl
                value={imageHeight}
                setValue={setImageHeight}
                id="width"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="grayscale" text="Grayscale" />
              <Button
                text={isGrayscaled ? "Disable" : "Enable"}
                disabled={false}
                onClick={() => setIsGrayscaled(!isGrayscaled)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="blur" text="Blur" />
              <input
                type="range"
                min="0"
                max="10"
                value={imageBlur}
                onChange={(e) => setImageBlur(+e.target.value)}
                id="blur"
                className="slider mt-2"
              />
            </FormGroup>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
