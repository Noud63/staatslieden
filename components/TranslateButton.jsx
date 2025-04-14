"use client"
import { useLanguage } from "@/context/LanguageContext";

const TranslateButton = () => {

    const { language, toggleLanguage } = useLanguage();

return (<div className="flex h-[full] max-xl:pr-0 ">
  <button
    onClick={toggleLanguage}
    className={`${
      language === "dutch"
        ? "bg-[url('../public/icons/english_flag.png')]" 
        : "bg-[url('../public/icons/dutch_flag.png')]"
    } h-[25px] w-[40px] bg-cover bg-center bg-no-repeat`}
  ></button>
</div>)
}
    
export default TranslateButton;