import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#060608] text-zinc-100 font-sans selection:bg-emerald-500/30 flex flex-col">
            {/* Immersive Blur Backgrounds - Moved here to be global */}
            <div className="fixed top-[-15%] right-[-15%] w-[60%] h-[60%] bg-emerald-500/5 blur-[150px] pointer-events-none -z-10 animate-pulse" />
            <div className="fixed bottom-[-15%] left-[-15%] w-[60%] h-[60%] bg-purple-500/5 blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
