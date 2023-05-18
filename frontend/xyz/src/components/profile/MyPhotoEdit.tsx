"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useMyPhoto } from "@/hooks/queries/myphoto";
import { useRouter } from "next/navigation";
import Btn from "../common/Btn";
import Img1 from "../../../public/images/background/bg (1).png";
import Img2 from "../../../public/images/background/bg (2).png";
import Img3 from "../../../public/images/background/bg (3).png";
import Img4 from "../../../public/images/background/bg (4).png";
import Img5 from "../../../public/images/background/bg (5).png";
import Img6 from "../../../public/images/background/bg (6).png";
import Img7 from "../../../public/images/background/bg (7).png";
import Img8 from "../../../public/images/background/bg (8).png";
import Img9 from "../../../public/images/background/bg (9).png";
import Img10 from "../../../public/images/background/bg (10).png";

interface MyPhotoEditProps {
  userSeq: number;
}

function MyPhotoEdit({ userSeq }: MyPhotoEditProps) {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const [selectedImage, setSelectedImage] = useState("");
  const handleClick = (image: string) => {
    setSelectedImage(image);
  };
  const { data: myPhotoList, isLoading: isMyPhotoLoading } =
    useMyPhoto(userSeq);

  const PushToMyPhotoCreate = () => {
    router.push(`profile/${userSeq}/myphoto/create`);
  };

  return (
    //만약에 대문 사진 없다면, 임의의 배경사진 넣어주기 (background img들 중)
    <div className=" w-full h-full ">
      <div className="flex flex-col gap-3 w-full h-full">
        <div className="relative flex items-center justify-center p-4">
          <img src={myPhotoList?.data} />
        </div>
        <div className="-z-10 absolute">
          <img src={selectedImage} />
        </div>
        <div className="flex items-center justify-center w-full pb-6">
          <Btn btnFunc={PushToMyPhotoCreate} bgColor="pink" text="사진찍기" />
        </div>
      </div>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <div
            key={image.src}
            className={`w-1/5 p-2 cursor-pointer ${
              selectedImage === image.src ? "w-1/2" : ""
            }`}
            onClick={() => handleClick(image.src)}
          >
            <img
              src={image.src}
              alt="Image"
              className={`w-full rounded-lg ${
                selectedImage === image.src ? "border-4 border-blue-500" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPhotoEdit;
