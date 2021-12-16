import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "src/redux/hooks/selectors";
import { getShowCaseProducts } from "src/redux/modules/show-case/showCase";
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
import BrandCard from "@components/common/brand-card";
import BestSellerProductFeed from "./feeds/best-seller-product-feed";

export default function ProductPopup() {
	const dispatch = useAppDispatch();

	const showCaseProducts = useAppSelector((state) => state.getShowCaseProducts.data)
	const { isLoading, error } = useAppSelector((state) => state.getShowCaseProducts)
	
	useEffect(() => {
		dispatch(getShowCaseProducts({pps: 5}))
	},[])

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
		colors,
		productDescription,
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
			<div className='text-black text-3xl font-black flex items-center justify-center p-20'>{brand.title}</div>
			<div className="bg-lar flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto ">
				<div className="bg-blue-100 flex-shrink-0 flex items-start justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-transparent">
					<img
						src={
							thumbnail ??
							"/assets/placeholder/products/product-thumbnail.svg"
						}
						alt={productName}
						className="lg:w-full scale-50"
					/>
				</div>

				<div className="bg-blue-200 flex flex-col items-start w-full px-8">
					<div className="pb-5 bg-lar">
						<div
							className="bg-facebook flex items-center justify-between mx-auto"
							onClick={navigateToProductPage}
							role="button"
						>
							<h2 className=" text-heading text-lg md:text-xl lg:text-2xl font-semibold">
								{productName}
							</h2>
							<div className='mx-4  px-8 py-2 rounded-full border text-black border-black border-opacity-100'>{state ?? stateProduct }</div>
						</div>
{/* 						<p className="text-sm leading-6 md:text-body md:leading-7">
							{shortDescription}
						</p> */}

						<div className="flex items-center mt-8 ">
							<div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
								{price}
							</div>
							<div className='text-brand-popup-product text-black'>Vendido por <strong>{brand.title}</strong></div>
							{discount && (
								<del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
									{basePrice}
								</del>
							)}
						</div>
					</div>
					<div className='flex-wrap flex justify-center gap-2 py-4'>
						{relatedTags.map((item: string, index: number) => {
							return (
								<div key={`${index}--related-tags-favorites-home`} className='p-2 px-4 rounded-full border border-black text-center text-black'>
									{item}
								</div>
							)
						})}
					</div>
					<div className='text-left  flex flex-col justify-start  text-black mt-2'>
						<p>Última atualização de informação: 3 horas atrás</p>
						<p>Online desde 31/08/2021 às 22:00</p>
					</div>
					<div className=' text-black flex justify-start gap-4 items-center  mt-4'>Tamanhos Disponíveis
						{size.map((item: string, index: number) => {
							return (
								<div className='p-1 rounded-sm border border-black text-black' key={`${index}--size-product`}>{item}</div>
							)
						})}
					</div>
					<div className=' text-black flex wrap justify-start gap-4 items-center my-6'>Cores
						{colors.map((item: string, index: number) => {
							return (
								<div key={`${index}--item--colors--code`} className='p-1 border border-gray-300 rounded' >
									<div className={`bg-${item}${item === 'black' ? '' : '-500'} font-body text-xs p-3 rounded-sm  h-2 w-2 flex items-center justify-center text-black`} key={`${item}--${index}--colors--product`}></div>
								</div>
							)
						})}
					</div>
					<button className='my-2 py-3 bg-black font-bold text-xl text-white w-3/4 rounded-md'>Visitar Site</button>
					<button className='flex items-center justify-center gap-10 text-lg my-4 bg-white text-black border border-black w-3/4 py-3 rounded-md'>
						<Image height='25px' width='25px' src='/assets/images/products/products-pop-up/heart.svg' alt='Imagem de um coração para adicionar produto aos favoritos'/>
						Adicionar aos Favoritos
					</button>
					
					<div className='border mt-5 shadow-cart text-black overflow-scroll h-1/5 p-2'>
						<p className='text-md'>Descrição do Produto</p>
						<p className='text-xs'>{productDescription}</p>
						<p className='text-md'>Valores Sustentáveis</p>
						<p className='text-md'>Informações de Compra</p>
					</div>
				</div>
			</div>
			<div className='bg-blue-200 p-8'>
				<h1 className=' text-black text-xl font-bold'><u>Produtos Similares</u></h1>
				<div>
{/* 					{showCaseProducts?.map((brand: any, id) => (
						<BestSellerProductFeed key={`${id}--pop-products-home`} data={brand} isLoading={isLoading} error={error} />
					))} */}
				</div>
			</div>
		</div>
	);
}
