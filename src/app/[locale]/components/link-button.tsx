import type { IconType } from "react-icons/lib";
import { MdKeyboardArrowRight } from "react-icons/md";

import { Link } from "@/i18n/navigation";

type Props = {
  href: string;
  icon: IconType;
  label: string;
};

export function ButtonLink({ href, icon: Icon, label }: Props) {
  return (
    <Link
      href={href}
      className="py-1 flex flex-row items-center bg-blue-300 text-blue-900 border-2 border-blue-900 rounded-2xl"
    >
      <span className="p-3 mr-5 relative right-3 bg-lime-400 text-blue-900 border-2 border-blue-900 rounded-2xl">
        <Icon size={32} />
      </span>
      <span>{label}</span>
      <span className="mx-3">
        <MdKeyboardArrowRight />
      </span>
    </Link>
  );
}
