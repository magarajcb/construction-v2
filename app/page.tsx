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
  
      </>
  )
}