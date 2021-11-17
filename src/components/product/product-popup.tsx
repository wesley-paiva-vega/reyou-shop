import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";

export default function ProductPopup() {
	const { t } = useTranslation("common");
	const {
		modalData: { data },
		closeModal,
		openCart,
	} = useUI();
	const router = useRouter();
	const { addItemToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const { price, basePrice, discount } = usePrice({
		amount: data.sale_price ? data.sale_price : data.price,
		baseAmount: data.price,
		currencyCode: "BRL",
	});
	const variations = getVariations(data.variations);
	const { 
		slug, 
		image, 
		productName, 
		shortDescription, 
		thumbnail, 
		brand, 
		state, 
		stateProduct, 
		relatedTags,
		size,
		colors
	} = data;

	const isSelected = !isEmpty(variations)
		? !isEmpty(attributes) &&
		  Object.keys(variations).every((variation) =>
				attributes.hasOwnProperty(variation)
		  )
		: true;

	function addToCart() {
		if (!isSelected) return;
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
			setViewCartBtn(true);
		}, 600);
		const item = generateCartItem(data!, attributes);
		addItemToCart(item, quantity);
		console.log(item, "item");
	}

	function navigateToProductPage() {
		closeModal();
		router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
			locale: router.locale,
		});
	}

	function handleAttribute(attribute: any) {
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

	function navigateToCartPage() {
		closeModal();
		setTimeout(() => {
			openCart();
		}, 300);
	}

	return (
		<div className="rounded-lg bg-white">
			<div className='text-black text-5xl font-black flex items-center justify-center p-20'>{brand.title}</div>
			<div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto ">
				<div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
					<img
						src={
							thumbnail ??
							"/assets/placeholder/products/product-thumbnail.svg"
						}
						alt={productName}
						className="lg:object-cover lg:w-full lg:h-full"
					/>
				</div>

				<div className="flex flex-col p-5 md:p-0 w-full md:px-4">
					<div className="pb-5">
						<div
							className="mb-2 md:mb-4 flex -mt-1.5 items-center justify-between w-3/4 mx-auto"
							onClick={navigateToProductPage}
							role="button"
						>
							<h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
								{productName}
							</h2>
							<div className='mx-4  px-8 py-2 rounded-full border text-black border-black border-opacity-100'>{state ?? stateProduct }</div>
						</div>
{/* 						<p className="text-sm leading-6 md:text-body md:leading-7">
							{shortDescription}
						</p> */}

						<div className="flex items-center mt-8  px-8">
							<div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
								{price}
							</div>
							<div className='text-black mx-4'>Vendido por <strong>{brand.title}</strong></div>
							{discount && (
								<del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
									{basePrice}
								</del>
							)}
						</div>
					</div>
					<div className=' flex justify-center gap-6 p-4'>
						{relatedTags.map((item: string) => {
							return (
								<div className='p-3 px-6 rounded-full border border-black text-black' key={item}>{item}</div>
							)
						})}
					</div>
					<div className='text-black px-8 mt-2'>
						<p>Última atualização de informação: 3 horas atrás</p>
						<p>Online desde 31/08/2021 às 22:00</p>
					</div>
					<div className=' text-black flex justify-center items-center gap-10 mt-4'>Tamanhos Disponíveis
						{size.map((item: string) => {
							return (
								<div className='p-1 border border-black text-black' key={item}>{item}</div>
							)
						})}
					</div>
					<div className=' p-2 px-6 text-black flex wrap justify-between items-center mt-4'>Cores
						{colors.map((item: string) => {
							return (
								<div className={`bg-${item}${item === 'black' ? '' : '-500'} font-body text-xs p-4  h-6 w-6 flex items-center justify-center border border-black text-black`} key={item}></div>
							)
						})}
					</div>
					<button className='mt-4 bg-black text-white w-3/4 h-16'>Visitar Site</button>
					<button className='my-4 bg-white text-black border border-black w-3/4 h-16'>Adicionar aos Favoritos</button>

				</div>
			</div>
		</div>
	);
}
