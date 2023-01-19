import Link from "next/link";
import Image from "next/image";
function Logo() {
  return (
    <Link legacyBehavior href="/">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image src="/Deloitte-logo_1.png" height={0} width={100} alt={""} />
      </a>
    </Link>
  );
}
export default Logo;
