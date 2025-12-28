/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import './index.css';
import './App.scss';
import Expertise from "./components/Expertise";
import Main from "./components/Main";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Timeline from "./components/Timeline";
import Project from "./components/Project";
import { Toaster } from "react-hot-toast";
import PreLoader from "./components/PreLoader";
import { ArrowUpward } from "@mui/icons-material";
import Chatbot from "./components/ChatBot";
import Lenis from "lenis";

function App() {
    const [mode, setMode] = useState('dark');
    const [isLoading, setIsLoading] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const lastScrollY = useRef(0);

    const lenisRef = useRef();

    const chatRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const wakeServer = async () => {
            try {
                await fetch(`${API_URL}`);
                console.log("Server wake-up request sent");
            } catch (err) {
                console.error("Wake-up failed:", err);
            }
        };

        wakeServer();
    }, []);


    useEffect(() => {
        const handleWheel = (e) => e.stopPropagation();
        const el = chatRef.current;
        if (el) el.addEventListener("wheel", handleWheel);
        return () => el?.removeEventListener("wheel", handleWheel);
    }, []);

    useEffect(() => {
        lenisRef.current = new Lenis({
            smooth: true,
            lerp: 0.075,
            infinite: false
        });

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenisRef.current?.destroy();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';

            if (scrollDirection === 'up' && currentScrollY > 0) {
                setShowBackToTop(false);
            }
            else if (scrollDirection === 'down' && currentScrollY > 300) {
                setShowBackToTop(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        lenisRef.current?.scrollTo(0, { behavior: "smooth" });
    };

    const handleModeChange = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Preloader Manage
    useEffect(() => {

        const finishLoading = () => {
            setIsLoading(false);
        };

        const checkAllImagesLoaded = () => {
            setTimeout(() => {
                const images = document.images;
                const totalImages = images.length;
                let loadedCount = 0;

                if (totalImages === 0) {
                    finishLoading();
                    return;
                }

                const imageLoadHandler = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        finishLoading();
                    }
                };

                for (let i = 0; i < totalImages; i++) {
                    if (images[i].complete) {
                        imageLoadHandler();
                    } else {
                        images[i].onload = imageLoadHandler;
                        images[i].onerror = imageLoadHandler;
                    }
                }
            }, 100);
        };
        if (document.readyState === "complete" || document.readyState === "interactive") {
            checkAllImagesLoaded();
        } else {
            window.addEventListener("DOMContentLoaded", checkAllImagesLoaded);
        }

        return () => {
            window.removeEventListener("DOMContentLoaded", checkAllImagesLoaded);
        };
    }, []);

    return (
        <>
            <div
                className={`back-to-top ${showBackToTop ? 'active' : ''}`}
                onClick={scrollToTop}
            >
                <ArrowUpward sx={{ color: 'white' }} />
            </div>
            <Toaster position="top-center" reverseOrder={false} />

            {isLoading && <PreLoader />}

            <div
                className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
                style={{ display: isLoading ? 'none' : 'block' }}
            >
                <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
                <Main />
                <Expertise />
                <Timeline />
                <Project />
                <Contact />
                <Footer />
            </div>

            <div ref={chatRef}>
                <Chatbot />
            </div>
        </>

    );
}

export default App;
