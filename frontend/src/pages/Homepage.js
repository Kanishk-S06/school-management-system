// src/pages/Homepage.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// --- Keyframe Animations (CSS animations defined in JS) ---

const bgFlow = keyframes`
    from { transform: translateY(0px) rotate(0deg) scale(1); }
    to { transform: translateY(-20px) rotate(180deg) scale(1.1); }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
`;

const slideDown = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
`;

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(60px); }
    to { opacity: 1; transform: translateY(0); }
`;

const fadeInRight = keyframes`
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
`;

const float3D = keyframes`
    0%, 100% { transform: rotateY(0deg) rotateX(0deg) translateY(0px); }
    50% { transform: rotateY(5deg) rotateX(2deg) translateY(-15px); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
`;

const cardFloat = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;


// --- Global Styles (for body, html, etc.) ---

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #0a0a0a;
        color: #ffffff;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }
`;

// --- Styled Components (HTML elements with styles) ---

const BgAnimation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 198, 255, 0.3) 0%, transparent 50%);
    animation: ${bgFlow} 20s ease-in-out infinite alternate;
`;

const Particle = styled.div`
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
    will-change: transform;
`;

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(20px);
    z-index: 100;
    padding: 20px 0;
    transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    animation: ${slideDown} 0.8s ease-out;
`;

const NavContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
`;

const LoginBtn = styled(Link)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 12px 30px;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
`;

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
`;

const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 60px;
        text-align: center;
    }
`;

const HeroText = styled.div`
    animation: ${fadeInUp} 1s ease-out 0.2s both;
    @media (max-width: 992px) {
        order: 2;
    }
`;

const HeroTitle = styled.h1`
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const HeroSubtitle = styled.p`
    font-size: 1.5rem;
    color: #a0aec0;
    margin-bottom: 3rem;
    line-height: 1.6;
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

const CtaButtons = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    @media (max-width: 992px) {
        justify-content: center;
    }
`;

const CtaPrimary = styled(Link)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    padding: 18px 40px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
    }
`;

const CtaSecondary = styled(Link)`
    background: transparent;
    border: 2px solid #667eea;
    color: #667eea;
    padding: 16px 40px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background: #667eea;
        color: white;
        transform: translateY(-3px);
    }
`;

const HeroVisual = styled.div`
    position: relative;
    animation: ${fadeInRight} 1s ease-out 0.4s both;
    @media (max-width: 992px) {
        order: 1;
    }
`;

const VisualContainer = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    perspective: 1000px;
    @media (max-width: 768px) {
        height: 350px;
    }
`;

const DashboardMockup = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 30px;
    animation: ${float3D} 8s ease-in-out infinite;
    transform-style: preserve-3d;
`;

const DashboardHeader = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 60px;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    animation: ${pulse} 2.5s ease-in-out infinite;
`;

const DashboardNav = styled.div` display: flex; gap: 10px; `;
const NavDot = styled.div` width: 12px; height: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.3); `;
const DashboardContent = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 200px; `;
const ContentCard = styled.div` background: rgba(255, 255, 255, 0.05); border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1); animation: ${cardFloat} 5s ease-in-out infinite; &:nth-child(2) { animation-delay: 1.5s; } `;
const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px; `;
const StatItem = styled.div` background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1); `;

const FeaturesSection = styled.section`
    padding: 100px 0;
    background: rgba(255, 255, 255, 0.02);
`;

const FeaturesContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const SectionTitle = styled.h2`
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 4rem;
    background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
`;

const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 40px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    cursor: pointer;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    &.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`;

const FeatureIcon = styled.div`
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 24px;
`;

const FeatureTitle = styled.h3` font-size: 1.5rem; font-weight: 700; margin-bottom: 15px; color: #ffffff; `;
const FeatureDesc = styled.p` color: #a0aec0; line-height: 1.6; `;


// --- The React Component ---

const Homepage = () => {

    useEffect(() => {
        
        const heroElement = document.querySelector('.hero-section-for-js');
        
        function createParticles() {
            if (!heroElement) return;
            const particleCount = 50;
            
            // Clear existing particles to avoid duplicates
            heroElement.querySelectorAll('.particle').forEach(p => p.remove());

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle'; // This class is styled by our styled-components logic
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                heroElement.appendChild(particle);
            }
        }
        createParticles();

        const handleScroll = () => {
            const nav = document.querySelector('.nav-for-js');
            if(nav) {
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(10, 10, 10, 0.9)';
                    nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                } else {
                    nav.style.background = 'rgba(10, 10, 10, 0.8)';
                    nav.style.boxShadow = 'none';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        const featureCards = document.querySelectorAll('.feature-card-for-js');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        featureCards.forEach(card => observer.observe(card));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            featureCards.forEach(card => observer.unobserve(card));
        };
    }, []);

    return (
        <>
            <GlobalStyle />
            <BgAnimation />
            
            <Nav className="nav-for-js">
                <NavContent>
                    <Logo>NexusEd</Logo>
                    <LoginBtn to="/choose">Login</LoginBtn>
                </NavContent>
            </Nav>

            <main>
                <HeroSection id="home" className="hero-section-for-js">
                    {/* The particles will be added here by the useEffect hook */}
                    <HeroContent>
                        <HeroText>
                            <HeroTitle>The Future of<br />Education<br />Management</HeroTitle>
                            <HeroSubtitle>
                                Experience next-generation school management with AI-powered insights,
                                seamless collaboration, and intuitive design that transforms how
                                educators and students connect.
                            </HeroSubtitle>
                            <CtaButtons>
                                <CtaPrimary to="/Adminregister">Get Started Free</CtaPrimary>
                                <CtaSecondary to="#">Watch Demo</CtaSecondary>
                            </CtaButtons>
                        </HeroText>
                        
                        <HeroVisual>
                            <VisualContainer>
                                <DashboardMockup>
                                    <DashboardHeader>
                                        <DashboardNav>
                                            <NavDot /> <NavDot /> <NavDot />
                                        </DashboardNav>
                                    </DashboardHeader>
                                    <DashboardContent>
                                        <ContentCard /> <ContentCard />
                                    </DashboardContent>
                                    <StatsGrid>
                                        <StatItem>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>1,250</div>
                                            <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Students</div>
                                        </StatItem>
                                        <StatItem>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>98%</div>
                                            <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Attendance</div>
                                        </StatItem>
                                        <StatItem>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>45</div>
                                            <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Classes</div>
                                        </StatItem>
                                        <StatItem>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>A+</div>
                                            <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Average</div>
                                        </StatItem>
                                    </StatsGrid>
                                </DashboardMockup>
                            </VisualContainer>
                        </HeroVisual>
                    </HeroContent>
                </HeroSection>

                <FeaturesSection id="features">
                    <FeaturesContainer>
                        <SectionTitle>Powerful Features for Modern Education</SectionTitle>
                        <FeaturesGrid>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>📊</FeatureIcon>
                                <FeatureTitle>Smart Analytics</FeatureTitle>
                                <FeatureDesc>Get deep insights into student performance, attendance patterns, and learning trends with AI-powered analytics.</FeatureDesc>
                            </FeatureCard>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>🎓</FeatureIcon>
                                <FeatureTitle>Student Management</FeatureTitle>
                                <FeatureDesc>Effortlessly manage student records, track academic progress, and maintain comprehensive profiles with our intuitive interface.</FeatureDesc>
                            </FeatureCard>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>👥</FeatureIcon>
                                <FeatureTitle>Faculty Collaboration</FeatureTitle>
                                <FeatureDesc>Enable seamless communication between teachers, administrators, and parents with integrated messaging systems.</FeatureDesc>
                            </FeatureCard>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>📱</FeatureIcon>
                                <FeatureTitle>Mobile Ready</FeatureTitle>
                                <FeatureDesc>Access NexusEd from anywhere with our responsive design and dedicated mobile apps for iOS and Android devices.</FeatureDesc>
                            </FeatureCard>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>🔐</FeatureIcon>
                                <FeatureTitle>Secure & Compliant</FeatureTitle>
                                <FeatureDesc>Your data is protected with enterprise-grade security, GDPR compliance, and regular security audits.</FeatureDesc>
                            </FeatureCard>
                            <FeatureCard className="feature-card-for-js">
                                <FeatureIcon>⚡</FeatureIcon>
                                <FeatureTitle>Lightning Fast</FeatureTitle>
                                <FeatureDesc>Experience blazing-fast performance with our optimized cloud infrastructure and intelligent caching systems.</FeatureDesc>
                            </FeatureCard>
                        </FeaturesGrid>
                    </FeaturesContainer>
                </FeaturesSection>
            </main>
        </>
    );
};

export default Homepage;