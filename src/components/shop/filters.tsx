import { useEffect, useState } from "react";
import { PartConditions } from "./part-conditions";
import { PrinciplesFilter } from "./principles-filter";
import { Category } from "./category";
import { TypeItems } from "./types-items"
import { FilteredItem } from "./filtered-item";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";
import { SearchBrands } from "./search-brands";
import SearchBox from 'src/components/search-box2'
import { useAppSelector } from "src/redux/hooks/selectors";
import { useAppDispatch } from "src/redux/store/store";

type TypeBrandsProps = {
	brands: [
		name?: string,
	]
}

export const ShopFilters: React.FC = () => {
	const dispatch = useAppDispatch();

	const data = useAppSelector((state) => state.getShowCaseProducts.data)	

	const router = useRouter();

	const { pathname, query } = router;

	const { t } = useTranslation("common");

	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-md md:text-md">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							router.push(pathname);
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(query) &&
						Object.values(query)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(query).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

			<PrinciplesFilter />
			<PriceFilter />
			<PartConditions />
			<Category />
			<TypeItems />
			<SearchBrands brands={data} />
			{/* <ColorFilter /> */}
		</div>
	);
};
