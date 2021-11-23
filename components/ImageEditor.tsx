import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import image from "next/image";
import { useRef, useEffect } from "react";

export type ImageEditorProps = {
  width?: number;
  height?: number;
  image: HTMLImageElement | undefined;
  isGrayscaled: boolean;
  blurRadius: number;
};
export const ImageEditor = (props: ImageEditorProps) => {
  const imageRef = useRef<any>();

  // when image is loaded we need to cache the shape
  useEffect(() => {
    if (props.image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [props.image]);

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

export default ImageEditor;
