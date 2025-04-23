"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

     const handleLocaleChange = (newLocale) => {
    // Strip the current locale from the path
    const segments = pathname.split('/');
    segments[1] = newLocale; // replace the locale segment
    const newPath = segments.join('/');

    router.push(newPath);

  };

return (
  <div className="flex h-full pt-1 max-md:w-full max-md:justify-end max-md:pt-0">
    <button
      value={currentLocale}
      onClick={() => handleLocaleChange(currentLocale === "nl" ? "en" : "nl")}
      className={`${
        currentLocale === "nl"
          ? "bg-[url('/icons/english_flag.png')]"
          : "bg-[url('/icons/dutch_flag.png')]"
      } h-[20px] w-[35px] bg-cover bg-center bg-no-repeat`}
    ></button>
  </div>
);
};

export default LanguageSwitcher;
