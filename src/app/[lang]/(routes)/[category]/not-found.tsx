import notFound from "@/public/not-found.png";
import Image from "next/image";
import Link from "next/link";

//not-found.js components do not accept any props.
export default function NotFound() {
  return (
    <div className="border m-10 p-10 flex justify-center flex-col items-center gap-6">
      <h2>Not Found</h2>
      <p>Could not find requested resource.</p>

      <Link href="/">
        <Image
          src={notFound}
          width={400}
          height={400}
          alt=""
          className="border bg-white rounded-md"
        />
      </Link>
    </div>
  );
}
