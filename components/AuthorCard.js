import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  gap: 4rem;
  min-height: 80vh;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
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
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8rem;
  color: #666;
  cursor: pointer;
`;

const Paragraph = styled.p`
  margin: 0;
`;

export default function AuthorCard({ onContinue }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for scroll or swipe down
  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > 10) {
        onContinue && onContinue();
      }
    };
    const handleWheel = (e) => {
      if (e.deltaY > 30) {
        onContinue && onContinue();
      }
    };
    const handleTouch = (e) => {
      let startY = null;
      const onTouchMove = (moveEvent) => {
        if (startY === null) startY = moveEvent.touches[0].clientY;
        const diff = startY - moveEvent.touches[0].clientY;
        if (diff < -40) {
          onContinue && onContinue();
          window.removeEventListener('touchmove', onTouchMove);
        }
      };
      window.addEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', handleTouch);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [onContinue]);

  return (
    <Container>
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
      <AnimatePresence>
        {showScrollIndicator && (
          <ScrollIndicator
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
            style={{ cursor: 'pointer' }}
          >
            ↓
          </ScrollIndicator>
        )}
      </AnimatePresence>
    </Container>
  );
} 