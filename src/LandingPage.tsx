import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from './components/LandingPage/AppBar';
import Hero from './components/LandingPage/Hero';
import LogoCollection from './components/LandingPage/LogoCollection';
import Highlights from './components/LandingPage/Highlights';
import Pricing from './components/LandingPage/Pricing';
import Features from './components/LandingPage/Features';
import Testimonials from './components/LandingPage/Testimonials';
import FAQ from './components/LandingPage/FAQ';
import Footer from './components/LandingPage/Footer';
import getLPTheme from './getLPTheme';
export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const LPtheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <AppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <LogoCollection />
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
                <Footer />
            </Box>
        </ThemeProvider>
    );
}