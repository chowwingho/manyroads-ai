import Link from "next/link";
import { MONO } from "./constants";

export default function GhostButton({ children, href = "#" }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center mr-btn-toggle px-4 py-2 rounded-md text-sm font-medium w-fit"
      style={MONO}
    >
      {children}
    </Link>
  );
}
