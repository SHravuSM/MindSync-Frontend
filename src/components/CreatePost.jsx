import { useState } from "react";
import Post from "./Post";
import Pitch from "./Pitch";
import { useAuthStore } from "../context/AuthContext";

export default function CreatePost() {
    const { yes, setYes } = useAuthStore();
    return (
        <>
            <div className="flex justify-center mt-5 px-1 md:px-1">
                <div className="flex max-w-xs sm:max-w-md md:max-w-lg bg-white/60 backdrop-blur-md shadow-md rounded-full border-t border-white overflow-hidden">
                    <button
                        onClick={() => setYes(false)}
                        className={`flex-1 text-center px-4 py-2 text-xl md:text-xl text-orange-500 font-semibold ${yes && "hover:text-black"} ${!yes && "text-white bg-blue-400"} transition-all duration-200 rounded-l-full`}
                    >
                        idea
                    </button>
                    <button
                        onClick={() => setYes(true)}
                        to='pitch'
                        className={`flex-1 text-center px-4 py-2 text-xl md:text-xl text-[tomato] font-semibold ${!yes && "hover:text-black"} ${yes && "text-white bg-yellow-400"} transition-all duration-200 rounded-r-full`}
                    >
                        Pitch
                    </button>
                </div>
            </div>
            {yes ? <Post /> : <Pitch />}
        </>
    )
}