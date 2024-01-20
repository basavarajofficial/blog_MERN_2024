import { Footer, FooterLinkGroup } from "flowbite-react"
import Logo from "./Logo"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

function FooterComponent() {
  return (
    <div>
      <Footer container className="border-2 border-t-teal-400">
          <div className="w-full mx-auto max-w-7xl">
            <div className="grid w-full justify-between sm:flex gap-6 align-middle">

            
          <Logo className="my-12" />
        
          <Footer.Copyright by="basavaraj's blogs" year={new Date().getFullYear()} />

           <div className="flex sm:gap-4 gap-2">
            <div>
            <Footer.Title title="About" />
            <FooterLinkGroup col>
              {/* <Footer.Link
                href="https://100jsprojects.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                100js Projects
              </Footer.Link> */}
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noreferrer noopener"
              >
                my blogs
              </Footer.Link>
            </FooterLinkGroup>
            </div>


            <div>
            <Footer.Title title="Follow Us" />

            <div  className="flex gap-4" >

              <Footer.Icon
                href="https://github.com/basavarajofficial"
                target="_blank"
                icon={AiFillGithub} />
              <Footer.Icon
                href="https://github.com/basavarajofficial"
                target="_blank"
                icon={AiFillLinkedin} />
              </div>
            </div>
            </div>


            </div>
          </div>
      </Footer>
    </div>

  )
}

export default FooterComponent