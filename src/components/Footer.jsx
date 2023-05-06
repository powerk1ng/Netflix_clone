import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import footerLinks from "../utils/FooterData";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !==
        "/mylist" && (
          <footer className="bg-black text-white pb-10 px-5 border-t border-zinc-600 pt-8">
            <div>
              <div className="flex mx-auto max-w-[1220px] flex-col gap-y-5">
                {/* social icons */}
                <div className="flex gap-x-5">
                  <a className="hover:text-white/80" href="#/">
                    {<FaFacebookF size={25} />}
                  </a>
                  <a className="hover:text-white/80" href="#/">
                    {<BsInstagram size={25} />}
                  </a>
                  <a className="hover:text-white/80" href="#/">
                    {<AiFillYoutube size={25} />}
                  </a>
                </div>

                {/* links */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 w-full gap-y-2">
                  {footerLinks.map((item, index) => (
                    <li key={index} className="">
                      <a
                        className="text-white hover:text-white/80 text-sm"
                        href="#/"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </footer>
        )}
    </>
  );
};

export default Footer;
