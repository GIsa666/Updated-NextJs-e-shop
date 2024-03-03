import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
const Footer = () => {
  return (
    <div className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">TV's</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns and Exchanges</Link>
            <Link href="#">FAQ</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About us</h3>
            <p className="mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              illum, dolores beatae perspiciatis ullam consequuntur est
              similique odio. Quasi harum quis iusto esse! Cum, tenetur ut!
              Ipsam iste eveniet dolorum!
            </p>
            <p>&copy; {new Date().getFullYear()} E-shop. All rights reserved.</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#"><MdFacebook size={24}/></Link>
              <Link href="#"><AiFillTwitterCircle size={24}/></Link>
              <Link href="#"><AiFillInstagram size={24}/></Link>
              <Link href="#"><AiFillYoutube size={24}/></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
