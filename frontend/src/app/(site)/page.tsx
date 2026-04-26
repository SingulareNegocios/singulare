import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { ContactForm } from "./_components/contactForm"
import { FAQ } from "./_components/faq"
export default async function Home() {
  return (
  <div className="h-[100vh] w-full flex flex-col bg-cloudDancer">
    <Navbar/>
    <p>Text</p>
    <FAQ/>
    <ContactForm />
    <Footer/>
  </div>
  )
  
}