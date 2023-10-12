import { Link, Twitter } from "lucide-react";

const SocialLinks = ({ icon, href }: { icon: "twitter"; href: string }) => {
  const ICONS = {
    twitter: <Twitter />,
  };

  const LinkComponent = <Link href={href}>{ICONS[icon]}</Link>;

  return LinkComponent;
};
