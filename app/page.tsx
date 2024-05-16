"use client";

import { useRouter } from "next/navigation";
import { classNames } from "@/libs";
import Image from "next/image";
import Link from "next/link";

import { Field } from "@/components";
import { clash } from "@/fonts";
import { routes } from "@/routes";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-24 w-full max-w-[33.5rem] mx-auto min-h-screen pt-[7.625rem]">
      <div className="flex flex-col gap-1 items-center">
        <Image
          alt="Pokebook logo"
          src={"/img/logo.png"}
          width={382}
          height={248}
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw"
        />

        <h1 className={classNames(clash.className, "font-semibold text-5xl")}>
          Poké<span className="text-primary">book</span>
        </h1>
        <p className="text-lg text-center md:w-96 px-4">
          Largest Pokémon index with information about every Pokemon you can
          think of.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="bg-primary  p-2 rounded-full w-full">
          <Field.Search
            onSearch={(search: string) => {
              console.log(search);
              router.push(routes.pokemon.index);
            }}
          />
        </div>

        <Link
          href={routes.pokemon.index}
          className="underline font-medium text-[#0D131A]"
        >
          View all
        </Link>
      </div>
    </main>
  );
}
