import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import logo from '../../../public/assets/images/Assinatura_Reyou.png'

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			<Image
				src={siteSettings.logo.url}
				alt={siteSettings.logo.alt}
				height={siteSettings.logo.height}
				width={siteSettings.logo.width}
				layout="fixed"
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
