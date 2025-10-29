import React from 'react'
import TitleBar from '@/components/TitleBar'

const ContactPage = () => {
  return (
    <div className="w-full max-w-[660px] mx-auto px-4 mt-4 max-md:max-w-full">
           <TitleBar title="Contact" titleWidth={"pl-2 font-bold"}/>
           <div className="w-full border-2 mt-4 text-white p-4 rounded-lg">
            <div>
              heeft u een vraag, klacht of een tip ter verbetering van de app?<br />
              Mail naar: info@staatslieden.nl<br />
            </div>
           </div>
    </div>
    
  )
}

export default ContactPage
