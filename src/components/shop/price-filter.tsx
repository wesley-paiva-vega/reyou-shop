import { CheckBox } from "@components/ui/checkbox";
import SlickLider from 'src/components/ui/range-slider'
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
const priceFilterItems = [
	{
		id: "1",
		name: "Abaixo de R$50",
		slug: "0-50",
	},
	{
		id: "2",
		name: "R$50 a R$100",
		slug: "50-100",
	},
	{
		id: "3",
		name: "R$100 a 150",
		slug: "100-150",
	},
	{
		id: "4",
		name: "R$150 a R$200",
		slug: "150-200",
	},
	{
		id: "5",
		name: "R$200 a R$300",
		slug: "200-300",
	},
	{
		id: "6",
		name: "R$300 a R$500",
		slug: "300-500",
	},
	{
		id: "7",
		name: "R$500 a R$1000",
		slug: "500-1000",
	},
	{
		id: "8",
		name: "Acima de R$1000",
		slug: "1000-",
	},
];
export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { price: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = priceFilterItems;

	return (
		<div className=" block border-b border-gray-300 pb-7 mb-7">
			<div className=" flex justify-between">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					{t("text-price")}
				</h3>
				<h2 className='font-semibold text-black' >R$</h2>
			</div>
			<div className="mt-2 flex flex-col space-y-4">
				<SlickLider></SlickLider>
{/* 				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))} */}
			</div>
		</div>
	);
};
