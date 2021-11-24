import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useImage from "use-image";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Head from "next/head";
import { useGetPictureQuery } from "../store/services/picsum";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
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
  <div className="pb-3 flex flex-col">{props.children}</div>
);

type EditorState = {
  imageWidth: number;
  imageHeight: number;
  imageBlur: number;
  isGrayScaled: boolean;
  imageId: string;
};

const initialState: EditorState = {
  imageBlur: 0,
  imageHeight: 0,
  imageWidth: 0,
  isGrayScaled: false,
  imageId: "",
};

const saveState = (state: EditorState) => {
  localStorage.setItem("savedState", JSON.stringify(state));
};

const Editor: NextPage = () => {
  const router = useRouter();
  const editedImageId = router.query["id"] as string;

  const { data } = useGetPictureQuery(editedImageId || "");
  const [image] = useImage(data?.download_url || "", "anonymous");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const downloadCallback = useRef<() => void>();

  const [editorState, setEditorState] = useState<EditorState>(initialState);
  const [originalBounds, setOriginalBounds] = useState<{
    width: number;
    height: number;
  }>({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    if (containerRef.current && editedImageId && data) {
      const imageRatio = Math.min(
        containerRef.current?.offsetWidth / data.width,
        containerRef.current?.offsetHeight / data.height
      );
      const initialHeight = imageRatio * data.height;
      const initialWidth = imageRatio * data.width;
      setOriginalBounds({ width: initialWidth, height: initialHeight });

      let loadedFromSave = false;
      const savedItem = localStorage.getItem("savedState");
      if (savedItem && editedImageId) {
        const savedState = JSON.parse(savedItem) as EditorState;
        if (savedState.imageId === editedImageId) {
          setEditorState(savedState);
          loadedFromSave = true;
        }
      }
      if (!loadedFromSave) {
        setEditorState((currentState) => ({
          ...currentState,
          imageId: editedImageId,
          imageWidth: Math.round(initialWidth),
          imageHeight: Math.round(initialHeight),
        }));
      }
    }
  }, [containerRef, editedImageId, data]);

  useEffect(() => {
    if (editorState.imageId) {
      saveState(editorState);
    }
  }, [editorState]);

  return (
    <div>
      <Head>
        <title>Edit Image | Photo Editor</title>
      </Head>
      <main>
        <Title step={"Step 2"} title={"Edit Image"} />

        <div className="flex flex-col md:flex-row py-10 px-5">
          <div
            className="flex-auto w-full md:w-8/12 flex items-center justify-center"
            style={{ minHeight: 500 }}
          >
            <motion.div
              className="rounded shadow w-full overflow-hidden mx-auto my-auto relative"
              style={{
                height: 600,
                maxWidth: originalBounds.width,
                maxHeight: originalBounds.height,
              }}
              ref={containerRef}
              layoutId={`imageWrapper-${editedImageId}`}
            >
              {image ? (
                <ImageEditor
                  width={editorState.imageWidth}
                  height={editorState.imageHeight}
                  image={image}
                  isGrayscaled={editorState.isGrayScaled}
                  blurRadius={editorState.imageBlur}
                  setDownloadCallback={(callback) => {
                    downloadCallback.current = callback;
                  }}
                />
              ) : (
                <Image
                  src={`https://picsum.photos/id/${editedImageId}/400`}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`https://picsum.photos/id/${editedImageId}/10/10`}
                  objectFit="cover"
                  objectPosition="center"
                  sizes="50wv"
                  alt="Currently edited image"
                />
              )}
            </motion.div>
          </div>
          <motion.div
            className="flex-auto w-full md:w-4/12 flex flex-col px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormGroup>
              <FormLabel for="width" text="Width (px)" />
              <NumberFormControl
                value={editorState.imageWidth}
                setValue={(value) =>
                  setEditorState({ ...editorState, imageWidth: value })
                }
                id="height"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="height" text="Height (px)" />
              <NumberFormControl
                value={editorState.imageHeight}
                setValue={(value) =>
                  setEditorState({ ...editorState, imageHeight: value })
                }
                id="width"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="grayscale" text="Grayscale" />
              <Button
                text={editorState.isGrayScaled ? "Disable" : "Enable"}
                disabled={false}
                onClick={() =>
                  setEditorState({
                    ...editorState,
                    isGrayScaled: !editorState.isGrayScaled,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="blur" text="Blur" />
              <input
                type="range"
                min="0"
                max="10"
                value={editorState.imageBlur}
                onChange={(e) =>
                  setEditorState({
                    ...editorState,
                    imageBlur: +e.target.value,
                  })
                }
                id="blur"
                className="slider mt-2"
              />
            </FormGroup>
            <Button
              text="Download"
              disabled={false}
              onClick={() => downloadCallback.current?.()}
              className="mt-auto py-5"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
