"use clients"
import {motion} from "framer-motion"
import {
  ArrowRight,
  Building2,
  Menu,
  Play,
  Ruler,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
const stats=[
  {value:"120+",label:"Projects Delivered"},
  {value:"18+",label:"Years Experirnce"},
  {value:"45+",label:"Team members"},
  {value:"99%",label:"Customer Satisfaction"}
]
const projects=[
  {
    number:"01",
    title:"Modern residence",
    location:"Madurai residence",
    category:"Residental"
  },{
     number: "02",
    title: "Commercial Complex",
    location: "Chennai, Tamil Nadu",
    category: "Commercial",
  },{
     number: "03",
    title: "Luxury Villa",
    location: "Coimbatore, Tamil Nadu",
    category: "Residential",
  }
]
const reasons=[
  "Experienced construction professionals",
  "Quality materials and workmanship",
  "Transparent project management",
  "On-time project delivery",
]
export default function Home(){
  const[menuOpen,setMenuOpen]=useState(false)
  return(
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
  {/* navbar */}
  <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
  <a href="#home" className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center bg-[#d6ff3f] text-black">
      <Building2 size={21}/>
      </div>
      <div>
        <div className="text-1g font-bold tracking-[0.2em]">
NEXA<span className="text-[#d6ff3f]">Build</span>
</div>
<div className="text-[9px] tracking-[0.35em] text-white/40">
Construction</div>
</div>
</a>

<div className="hidden items-center gap-8 md:flex">
  {["Home","About","Services","Projects","Contact"].map(
(item)=>(
  <a
  key={item}
  href={`#${item.toLowerCase()}`}
 className="group relative text-sm text-white/70 transition hover:text-white">
  {item}
  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#d6ff3f] transition-all duration-300 group-hover:w-full"/>
 </a>
)  
)
  }
  </div>
  <a
  href="#contact"
  className="hidden items-center gap-2 bg-[#d6ff3f] px-5 py-5 text-5m fond-bold text-black transition hover:bg-white md:flex"
>
  GET A QUOTE
  <ArrowRight size={16}/>
</a>
<button
onClick={()=>setMenuOpen(!menuOpen)}
className="md:hidden"
aria-label="Toggle-menu">
  {menuOpen?<X/>:<Menu/>}
</button>
</div>
  {menuOpen &&(
    <div className="border-t border-white/10 bg-black px-6 py-5 md:hidden">
      {["Home","About","Services","Projects","Contact"].map(
        (item)=>(
          <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={()=>setMenuOpen(false)}
          className="block border-b border-white/10 py-4 text-white/80">
            {item}
          </a>
        )
      )}

    </div>
  )}
</nav>
{/* hero */}
<section
id="home"
className="relative flex min-h-screen items-center pt-20">
  <div className="absolute"
</section>
  }