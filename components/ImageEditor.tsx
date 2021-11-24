import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import React, { useRef, useEffect } from "react";

function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type ImageEditorProps = {
  width?: number;
  height?: number;
  image: HTMLImageElement | undefined;
  isGrayscaled: boolean;
  blurRadius: number;
  setDownloadCallback: (callback: () => void) => void;
};

export const ImageEditor = (props: ImageEditorProps) => {
  const imageRef = useRef<any>();
  const { setDownloadCallback } = props;

  useEffect(() => {
    if (props.image) {
      imageRef.current?.cache();
    }
  }, [props.image]);

  useEffect(() => {
    const callback = () => {
      const uri = imageRef.current.toDataURL();
      downloadURI(uri, `image-${Date.now()}.png`);
    };
    setDownloadCallback(callback);
  }, [imageRef, setDownloadCallback]);

  return (
    <Stage width={props.width} height={props.height}>
      <Layer>
        <Image
          ref={imageRef}
          image={props.image}
          width={props.width}
          height={props.height}
          alt="The currently edited image"
          filters={
            props.isGrayscaled
              ? [Konva.Filters.Grayscale, Konva.Filters.Blur]
              : [Konva.Filters.Blur]
          }
          blurRadius={props.blurRadius}
        />
      </Layer>
    </Stage>
  );
};

ImageEditor.displayName = "ImageEditor";

export default ImageEditor;
