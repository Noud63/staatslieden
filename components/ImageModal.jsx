// import React from 'react'
// import Image from 'next/image'

// const ImageModal = ({open, setOpen, image}) => {
//   return (
//     open && (
//       <div
//         className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex w-full items-center justify-center overflow-y-auto bg-yellow-950/80"
//         onClick={() => setOpen(false)}
//       >
//         <div className="h-auto max-w-[1000px] border-t-8 border-x-8 border-white transition duration-500 ">
//           <Image
//             src={image}
//             width={900}
//             height={0}
//             alt="ovmap"
//             className="h-auto w-auto cursor-pointer object-cover"
//           />
//           <div className="bg-white text-yellow-700 text-lg py-4 font-semibold">{image === "/images/lijn19.png" ? "Tramlijn 19" : "Buslijn 21"}</div>
//         </div>
//       </div>
//     )
//   );
// }

// export default ImageModal
