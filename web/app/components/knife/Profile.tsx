import Grid from "../Grid";
import Image from "next/image";
import ChevronCircleLeft from "../icons/ChevronCircleLeft";
import ChevronCircleRight from "../icons/ChevronCircleRight";

export default function Profile({
  name,
  wrap,
  sheath,
  coverImageUrl,
  description,
  galleryImageUrls,
  cols = { mobile: 4, desktop: 4 },
  isSpecialProject = false,
  classes = "",
}: {
  name: string;
  wrap: string;
  sheath: string;
  coverImageUrl: string;
  description?: string;
  galleryImageUrls?: string[];
  isSpecialProject?: boolean;
  cols?: { mobile: 3 | 4; desktop: 3 | 4 };
  classes?: string;
}) {
  return (
    <Grid
      cols={`grid-cols-${cols.mobile} lg:grid-cols-${cols.desktop}`}
      gap="gap-4 md:gap-6"
      classes={`
        bg-black border-t md:border-0 border-neutral-200
        ${classes}
      `}
    >
      {galleryImageUrls?.toString()}
      <h3 className="md:hidden text-lg col-span-full text-right pt-2 -my-1.5 ">
        {name}
      </h3>
      <div
        className={`
        col-span-full md:col-span-2 relative 
        ${cols.desktop === 3 ? "lg:col-span-1" : null}
      `}
      >
        <Image
          src={coverImageUrl}
          alt={name || "knife"}
          width={1000}
          height={1000}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
          priority
        />
        <ChevronCircleLeft classes="z-10 shrink-0 opacity-[80%] hover:text-opacity-100 transition absolute top-1/2 left-3 transform -translate-y-1/2" />
        <ChevronCircleRight classes="z-10 shrink-0 opacity-[80%] hover:text-opacity-100 transition absolute top-1/2 right-3 transform -translate-y-1/2" />
        <div className="flex gap-2 absolute bottom-6 transform left-1/2 -translate-x-1/2">
          {galleryImageUrls?.map((url, i) => (
            <span
              key={url}
              className="w-6 h-6 rounded-full bg-white opacity-[85%] hover:opacity-100 transition cursor-pointer"
            ></span>
          ))}
        </div>
      </div>
      <div className="col-span-full md:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
        <h3 className="col-span-full md:col-span-2 hidden md:inline-block text-lg xl:text-xl text-right border-t border-neutral-200 pt-1">
          {name}
        </h3>
        {description && (
          <p className="col-span-full md:col-span-2 xl:col-span-1 -my-1">
            {description.trim()}
          </p>
        )}
        <table
          className="col-span-full md:col-span-2 self-end w-full transition-all ease-out duration-150 "
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            {isSpecialProject ? (
              <tr className="border-t-[0.5px] border-neutral-200">
                <td>Special Project</td>
              </tr>
            ) : null}
            <tr className="flex gap-6 border-y-[0.5px] border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Wrap</td>
              <td className="flex-1 leading-4 my-0.5">{wrap}</td>
            </tr>
            <tr className="flex gap-6 border-b-[0.5px] border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Sheath</td>
              <td className="flex-1 leading-4 my-0.5">{sheath}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Grid>
  );
}
