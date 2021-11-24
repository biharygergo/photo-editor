import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";

import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { useRouter } from "next/dist/client/router";

const Success: NextPage = () => {
  const router = useRouter();

  const backToGalleryClick = () => {
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>Success | Photo Editor</title>
      </Head>
      <main>
        <Title step={"Step 3"} title={"Success"} />

        <div className="flex flex-col items-center py-10 px-5">
          <motion.h1
            className="text-8xl mb-8 text-center"
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            🎉
          </motion.h1>
          <h2 className="text-6xl font-light text-green-400 text-center">
            Enjoy your image!
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center mt-20"
          >
            <Button
              text="Back to Gallery"
              disabled={false}
              onClick={backToGalleryClick}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Success;
