import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './src/components/layout/Layout';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Dashboard from './src/pages/Dashboard';


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
       
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
};

const App = () => {
    return (
        <BrowserRouter>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .page-transition-wrapper {
                    animation: fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0px); }
                }
            `}} />

            <ScrollToTop />
            
            <Routes>
                <Route path="/" element={<Layout />}>
                    
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;