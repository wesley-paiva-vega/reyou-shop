import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import Instagram from "@components/common/instagram";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import ProductsFeatured from "@containers/products-featured";
import BannerSliderBlock from "@containers/banner-slider-block";
import ExclusiveBlock from "@containers/exclusive-block";
import Subscription from "@components/common/subscription";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { homeThreeBanner as banner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import HeroBlock from "@containers/hero-block";
import FlipCard from '../components/common/flip-card/FlipCard';
import { useAppSelector, useAppDispatch } from "src/redux/hooks/selectors";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getHotConcepts } from '../redux/modules/hot-concepts/getHotConceptsSlice'
import { getFlipCard } from "src/redux/modules/flip-cards/getFlipCardSlice";
import { getPublicity } from '../redux/modules/publicity/publicitySlice'
import { getBanner } from "src/redux/modules/banners/getBannerSlice";
import { getDarlingMoments } from '../redux/modules/darlings-moment/darlingsMoments'
import { getReyouFavorites } from '../redux/modules/reyou-favorites/reYouFavorites'
import { getNews } from "src/redux/modules/news/news";
import { getBlogs } from "src/redux/modules/blogs/blogs";
import { getPress } from "src/redux/modules/press/press";
import { getConfig } from "src/redux/modules/config-portal/config-portal";

export default function Home() {

	const {name} =  useAppSelector((state) => state.userTest)
	const {data} =  useAppSelector((state) => state.getConceptsData)

	console.log(name)
	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch(getHotConcepts());
		dispatch(getFlipCard());
		dispatch(getPublicity());
		dispatch(getBanner());
		dispatch(getDarlingMoments());
		dispatch(getReyouFavorites());
		dispatch(getNews())
		dispatch(getBlogs())
		dispatch(getPress())
		dispatch(getConfig())
	},[])

 	return (
		<>
			<HeroBlock />
			<BannerBlock data={masonryBanner} />
			<Container>
				<ProductsFlashSaleBlock date={"2023-03-01T01:02:03"} />
			</Container>
			<BannerSliderBlock />
			<Container>
				<CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
				<ProductsFeatured sectionHeading="text-featured-products" />
				<BannerCard
					key={`banner--key${banner[0].id}`}
					banner={banner[0]}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/>
				<BrandGridBlock sectionHeading="text-top-brands" />
				<BannerCard
					key={`banner--key${banner[1].id}`}
					banner={banner[1]}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/>
				<BannerWithProducts
					sectionHeading="text-on-selling-products"
					categorySlug="/search"
				/>
				<ExclusiveBlock />
				<NewArrivalsProductFeed />
				<DownloadApps />
				<Support />
				<Instagram />
				<Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" />
			</Container>
			<Divider className="mb-0" />
		</>
	);
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
