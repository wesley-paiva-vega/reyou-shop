import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useLogoutMutation } from "@framework/auth/use-logout";
import { useTranslation } from "next-i18next";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import { signOut, useSession } from "next-auth/react";

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "text-dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },

  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "text-account-details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "text-change-password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const { mutate: logout } = useLogoutMutation();
  const { pathname } = useRouter();
	const router = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const mainPath = `/${newPathname[0]}`;
  const { t } = useTranslation("common");

	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut();
		router.push('/');
	}

  return (
    <nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
      {accountMenu.map((item) => {
        const menuPathname = item.slug.split("/").slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={
                mainPath === menuPath
                  ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
                  : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
              }
            >
              {item.icon}
              <span className="ps-2">{t(`${item.name}`)}</span>
            </a>
          </Link>
        );
      })}
      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={() => handleSignOut()}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ps-2">{t("text-logout")}</span>
      </button>
    </nav>
  );
}
