import Banner from "@/components/banner";
import ArrivalProducts from "@/components/new-arrival";
import TopSellingProducts from "@/components/top-selling";
import GYM from "@/components/browserGym";

export default function Home() {
  return (
   <div>
    <Banner/>
    <hr className="bg-black"/>
    <ArrivalProducts/>
    {/* <hr className="bg-black"/> */}
    <TopSellingProducts/>
    <hr className="bg-black"/>
    <GYM/>
    <hr className="bg-black"/>  
   </div>
  );
}
