import { Twitter } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const SocialLinks = ({ icon, href }: { icon: "twitter"; href: string }) => {
    const ICONS = {
      twitter: <Twitter />,
    };

    const LinkComponent = <Link href={href}>{ICONS[icon]}</Link>;

    return LinkComponent;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SocialLinks href="/twitter" icon="twitter" />
    </main>
  );
}
