import { client } from "./client";
import { bannerQuery, getEssentialsMensQuery, getEssentialsmmanQuery, getEssentialsWomensQuery, getEssentialswwomenQuery } from "./queries";

export const getBannersData = async () => {
    const bannersData = await client.fetch(bannerQuery);
    return bannersData;
  };
  
  // export const getManBannersData = async () => {
  //   const bannersData = await client.fetch(menBannerQuery);
  //   return bannersData;
  // };
  
  export const getEssentialsMensData = async () => {
    const bannersData = await client.fetch(getEssentialsMensQuery );
    return bannersData;
  };
  
  export const getEssentialsWomensData = async () => {
    const bannersData = await client.fetch(getEssentialsWomensQuery);
    return bannersData;
  };
  
  export const getEssentialsmmanData = async () => {
    const bannersData = await client.fetch(getEssentialsmmanQuery);
    return bannersData;
  };
  
  export const getEssentialswwomenData = async () => {
    const bannersData = await client.fetch(getEssentialswwomenQuery);
    return bannersData;
  };
  