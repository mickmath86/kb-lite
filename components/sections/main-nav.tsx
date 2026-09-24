import { NavbarWithLogoActionsAndCenteredLinks, NavbarLink, NavbarLogo } from "@/components/sections/navbar-with-logo-actions-and-centered-links";
import NavDropDown  from "@/components/elements/navbar-dropdown";
import { PlainButtonLink, ButtonLink } from "@/components/elements/button";
import { ArrowNarrowRightIcon } from "@/components/icons/arrow-narrow-right-icon";
import NavbarDropdown2 from "@/components/elements/navbar-dropdown-2";

export default function MainNav() {
  return (
    
     <NavbarWithLogoActionsAndCenteredLinks
             id="navbar"
             links={
               <>
                 
                 <NavDropDown />
                 <NavbarLink href="/pricing">Pricing</NavbarLink>
                 <NavbarLink href="/ai-voice-agents">Our Work</NavbarLink>
                 <NavbarLink href="/results">Blog</NavbarLink>
                 <NavbarDropdown2 />
                 <NavbarLink href="/get-started" className="sm:hidden">
                   Get started
                 </NavbarLink>
               </>
             }
             logo={
               <NavbarLogo href="/">
                 <img
                   src="/Logos/icon.svg"
                   alt="Kickbord"
                   className="dark:hidden"
                   width={85}
                   height={28}
                 />
                 <img
                   src="/Logos/icon.svg"
                   className="not-dark:hidden"
                   width={85}
                   height={28}
                 />
                 {/* <h1 className="text-4xl  font-display">Kickbord</h1> */}
               </NavbarLogo>
             }
             actions={
               <>
                 <PlainButtonLink href="#" className="max-sm:hidden">
                   Log in
                 </PlainButtonLink>
                 <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
               </>
             }
           />
 
  )
}