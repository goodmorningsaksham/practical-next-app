"use client"

import { useState } from "react";

export default function About() {

    
    const [openIndex, setOpenIndex] = useState(null); 
    
    const items = [
    {
      title: "Who we are",
      content: "We are a team passionate about building modern web experiences."
    },
    {
      title: "What we do",
      content: "We design and develop fast, scalable, and user-friendly applications."
    },
    {
      title: "Our mission",
      content: "Our mission is to deliver high-quality digital products with great UX."
    }
  ];

    const toggle = (index : any) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return(
        <main className="min-h-screen w-full flex flex-col justify-between items-center p-24 text-slate-400">
            <h1 className="text-2xl font-bold ">About Us</h1>
            <div className="max-w-3xl w-[75%] p-12">
                {items.map((item,index) => (
                    <div
                        key={index}
                        className="bg-yellow-400 text-black rouned-xl overflow-hidden border-b-2"
                    >
                        <button
                            onClick={()=> {toggle(index)}}
                            className="w-full flex justify-between items-center p-6 text-xl font-medium focus:outline-none"
                        >
                            {item.title}
                            <span 
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? "rotate:180" : ""
                                }`}
                            >▼
                            </span>
                        </button>
                        <div
                            className={`bg-violet-400 w-full text-xl font-medium transition-all px-6 duration-300 ease-in-out
                                ${openIndex === index ? "max-h-40 opacity-100 pt-4 pb-4" : "max-h-0 opacity-0"}
                                overflow-hidden`}
                            >
                        {item.content}
                        </div> 
                    </div>
                ))}
            </div>
            <h2>Happy Reading</h2>
        </main>
    )
}