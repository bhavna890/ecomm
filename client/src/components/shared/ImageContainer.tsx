import type { IImage } from "@/types";
import { HeartIcon } from "lucide-react";
import React from "react";


const ImageContainer = ({ data }: { data: IImage[] }) => {
  console.log(data);
  const [defaultImg, setDefaultImg] = React.useState(data[0]?.url);

  return (
    <div className="h-[500px] flex flex-col sm:flex-row overflow-hidden justify-center ">

      <div className="w-[100px] h-full overflow-y-scroll hide-scrollbar hidden sm:block ">

        {data.map((image, i) => (
          <div
            key={i}
            className="h-[150px] m-1 border-2 border-black cursor-pointer"
            onMouseOver={() => setDefaultImg(image.url)}
          >
            <img src={image.url} alt="" className="w-full h-full object-cover" />
          
          </div>
          
        ))}
      </div>
      <div className="h-[400px] sm:h-full relative ">
          <HeartIcon className="text-black absolute top-2 right-2 " />
        <img src={defaultImg} alt="" className="w-full h-full object-contain sm:object-cover" />

        <div>{/* zoom image */}</div>
         
      </div>
      <div className="flex justify-center overflow-x-scroll hide-scrollbar sm:hidden">
        {data.map((image, i) => (
          <div
            key={i}
            className="h-[90px] min-w-[60px] m-1 border-2 border-black cursor-pointer"
            onMouseOver={() => setDefaultImg(image.url)}
          >
            <img src={image.url} alt="" className="w-full h-full object-cover" />
            
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;