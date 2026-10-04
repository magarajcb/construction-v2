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
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(210,255,63,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_25%]"/>
  <div className="absolute right-[-10%] top-[15%] h-[600px] w-[600px] rounded-full border border-white/5" />
  <div className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full border border-[#d6ff3f]/10" />
  <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
         {/* Hero Text */}
         <div className="flex flex-col justify-center">
          <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.7}}
          className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#d6ff3f]"/>
            <span className="text-xs font -semibold uppercase tracking-[0.3em] text-[#d6ff3f]">
              Building Beyond Boundries 
            </span>
          </motion.div>
          <motion.h1
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.1}}
          className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            WE BUILD 
            <br/>
            <span className="text-[#d6ff3f]">
              THE FUTURE
            </span>
          </motion.h1>
          <motion.p
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.7,delay:0.3}}
          className="mt-8 max-w-xl text=lg leading-8 text-white/50">
            From ambitious architectural concepts to extraordinary
            completed spaces, we transform ideas into structures built
            to last.
          </motion.p>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4">
            <a
            href="#projects"
            className="group flex items-center gap-3 bg-[#d6ff3f] px-7 py-4 font-bold text-black transition hover:bg-white">
              Explore Projects
              <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-l"/>
            </a>
            <button className="flex items-center gap-3 border border-white/20 px-7 py-4 font-bold transition hover:border-white hover:bg-white hover:text-black">
              <Play size={17} />
                WATCH OUR STORY
            </button>

          </motion.div>

         </div>
  </div>
</section>
  }