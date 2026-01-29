import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Chatbot from "../components/ChatBot";
import Contact from "../components/Contact";
import Expertise from "../components/Expertise";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Navigation from "../components/Navigation";
import PreLoader from "../components/PreLoader";
import Project from "../components/Project";
import Timeline from "../components/Timeline";

const Home = ({
    showBackToTop,
    scrollToTop,
    isLoading,
    mode,
    handleModeChange,
    chatRef
}) => {
    return (
        <>
            <div
                className={`back-to-top ${showBackToTop ? 'active' : ''}`}
                onClick={scrollToTop}
            >
                <ArrowUpward sx={{ color: 'white' }} />
            </div>


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
};

export default Home;
