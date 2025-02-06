import { groq } from 'next-sanity';


export const sixProductsQuery = groq`*[_type == "product"][0..5]`;

export const allProductsQuery = groq`*[_type == "product"]`;

export const fourProductsQuery = groq`*[_type == "product"][0..3]`;

export const topSellingProductsQuery = groq`*[_type == "product"][10..13]`;






export const newProductsQuery = groq`*[_type == "product" && "new" in tags]`;

export const salesProductsQuery = groq`*[_type == "product" && "sale" in tags]`;

export const brandProductsQuery = groq`*[_type == "product" && "brand" in tags]`;

export const menProductsQuery = groq`*[_type == "product" && "men" in tags]`;


export const bannerQuery = groq`*[_type == 'banner' && "banner" in tags]`;

// export const menBannerQuery = groq`*[_type == 'banner' && "men" in tags]`;

export const helpQuery =`*[_type == 'help']`

export const getEssentialsMensQuery = groq`*[_type == 'banner' && "men" in tags]`;

export const getEssentialsWomensQuery = groq`*[_type == 'banner' && "women" in tags]`;

export const getEssentialsmmanQuery = groq`*[_type == 'banner' && "mmen" in tags]`;

export const getEssentialswwomenQuery = groq`*[_type == 'banner' && "wwomen" in tags]`;