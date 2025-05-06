import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  gap: 4rem;
  min-height: 80vh;
  align-items: center;
  position: relative;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const AuthorImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 900px) {
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 1.2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const Description = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScrollIndicator = styled(motion.div)`
  font-size: 8rem;
  color: #666;
  cursor: pointer;
  margin-top: 2rem;
  position: relative;
  z-index: 10;
`;

const Paragraph = styled.p`
  margin: 0;
`;

export default function AuthorCard({ onContinue }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasReachedArrow, setHasReachedArrow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerBottom = container.getBoundingClientRect().bottom;
      const arrowElement = container.querySelector('[data-scroll-indicator]');
      
      if (!arrowElement) return;
      
      const arrowBottom = arrowElement.getBoundingClientRect().bottom;
      
      if (containerBottom <= window.innerHeight && !hasReachedArrow) {
        setHasReachedArrow(true);
        window.scrollTo({
          top: arrowBottom - window.innerHeight,
          behavior: 'smooth'
        });
      }
      
      if (hasReachedArrow && window.scrollY > arrowBottom - window.innerHeight) {
        onContinue && onContinue();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedArrow, onContinue]);

  return (
    <Container ref={containerRef}>
      <ContentWrapper>
        <ImageColumn>
          <AuthorImage src="/assets/dr_lawrence_brit.jpg" alt="Dr. Lawrence W. Britt" />
        </ImageColumn>
        <TextColumn>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2 }}
          >
            Dr. Lawrence W. Britt
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.2 }}
          >
            <Paragraph>
              International businessman turned writer and commentator. After a successful career in the corporate world, he channeled his lifelong passion for history and current events into writing.
            </Paragraph>
            <Paragraph>
              He's a voracious reader and self-taught scholar, boasting a personal library of over 3,000 volumes on history and politics.
            </Paragraph>
            <Paragraph>
              His deep dives into the past inform his insights into the present, making him a compelling voice in contemporary discourse.
            </Paragraph>
          </Description>
        </TextColumn>
      </ContentWrapper>
      <AnimatePresence>
        {showScrollIndicator && (
          <ScrollIndicator
            data-scroll-indicator
            initial={{ y: 20 }}
            animate={{ 
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => onContinue && onContinue()}
          >
            ↓
          </ScrollIndicator>
        )}
      </AnimatePresence>
    </Container>
  );
} 