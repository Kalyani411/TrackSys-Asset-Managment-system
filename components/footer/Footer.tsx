"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-800/90 py-3 text-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-slate-300">
          © {new Date().getFullYear()} TrackSys
        </span>
        <span className="text-[11px] text-slate-400">
          Secure Asset Tracking System
        </span>
      </div>
    </footer>
  );
}


// export default Footer;

// export default function Footer() {
//   return (
//     <footer className="mt-10 border-t bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        
//         {/* Left */}
//         <p>
//           © {new Date().getFullYear()} TrackSys. All rights reserved.
//         </p>

//         {/* Right */}
//         <div className="flex gap-4 mt-2 md:mt-0">
//           <span className="hover:text-gray-700 cursor-pointer">
//             Privacy
//           </span>
//           <span className="hover:text-gray-700 cursor-pointer">
//             Terms
//           </span>
//           <span className="hover:text-gray-700 cursor-pointer">
//             Support
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// }
