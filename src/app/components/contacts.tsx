import MapSection from "./map";
import ContactForm from "./contactForm";

export default function ContactPage(){
    return (<section>
        <h1 className={`text-5xl font-bold flex justify-center mt-5`}> Contact Page</h1>
         <div className="mt-5"><ContactForm/></div>
        <div className="mt-5"><MapSection/></div>
       
        
    </section>)
}