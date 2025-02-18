import Link from "next/link";

interface LinkPageProps {
  page: string;
  text: string;
}

export default function ButtonNav({ page, text }: LinkPageProps) {
  return (
    <button className="rounded-full border border-solid border-separate  text-center text-white hover:bg-[#383838] h-10 w-40">
      <Link href={page}>{text}</Link>
    </button>
  );
}
