import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
`;

const TypingText = styled(motion.div)`
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #222;
  min-height: 3.5rem;
`;

const ResultBox = styled(motion.div)`
  margin: 2.5rem 0 1.5rem 0;
  padding: 2rem 3rem;
  border-radius: 18px;
  background: #f7f7f7;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultMessage = styled.div`
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const Percentage = styled.div`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: ${({ percent }) => {
    if (percent <= 40) return '#2ecc40'; // green
    if (percent <= 69) return '#f1c40f'; // yellow
    if (percent <= 80) return '#ff9800'; // orange
    return '#e53935'; // red
  }};
  margin-bottom: 1.5rem;
`;

const ExplanationLink = styled.a`
  color: #007bff;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  &:hover {
    color: #0056b3;
  }
`;

const ClosingParagraph = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin-top: 2.5rem;
  text-align: center;
  max-width: 600px;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.7rem;
  color: #333;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e0e0e0;
    color: #007bff;
  }
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.7rem;
  color: #333;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e0e0e0;
    color: #007bff;
  }
`;

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#1877F3"/>
    <path d="M15.36 8.5H13.5V7.5C13.5 7.22 13.72 7 14 7H15V5H13.5C12.12 5 11 6.12 11 7.5V8.5H9V10.5H11V19H13.5V10.5H15L15.36 8.5Z" fill="white"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <radialGradient id="ig-gradient" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stopColor="#f9ce34"/>
      <stop offset="45%" stopColor="#ee2a7b"/>
      <stop offset="100%" stopColor="#6228d7"/>
    </radialGradient>
    <rect width="24" height="24" rx="6" fill="url(#ig-gradient)"/>
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#000"/>
    <path d="M17.5 9.5C16.12 9.5 15 8.38 15 7V6H13V16C13 17.1 12.1 18 11 18C9.9 18 9 17.1 9 16C9 14.9 9.9 14 11 14C11.35 14 11.68 14.07 12 14.18V12.13C11.67 12.05 11.34 12 11 12C8.79 12 7 13.79 7 16C7 18.21 8.79 20 11 20C13.21 20 15 18.21 15 16V11.5C15.81 12.16 16.81 12.5 17.5 12.5V9.5Z" fill="#fff"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="#25F4EE"/>
    <circle cx="15" cy="6" r="1" fill="#FE2C55"/>
  </svg>
);

export default function FinalSection({ answers, totalQuestions }) {
  const [typed, setTyped] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const sectionRef = useRef(null);
  const fullText = 'Fascism is an ideology, not a person.';
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://historywillrepeat.com';

  useEffect(() => {
    function handleScroll() {
      if (!typingStarted && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTypingStarted(true);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [typingStarted]);

  useEffect(() => {
    if (!typingStarted) return;
    let i = 0;
    let typing;
    function type() {
      setTyped(fullText.slice(0, i + 1));
      if (i < fullText.length - 1) {
        i++;
        typing = setTimeout(type, 45);
      } else {
        setTimeout(() => setShowResult(true), 600);
        setTimeout(() => setShowLink(true), 1200);
        setTimeout(() => setShowClosing(true), 1800);
      }
    }
    type();
    return () => clearTimeout(typing);
  }, [typingStarted]);

  const score = answers.reduce((sum, answer) => sum + answer, 0);
  const percent = Math.round((score / (totalQuestions * 4)) * 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Container ref={sectionRef}>
      <TypingText>{typed}</TypingText>
      <AnimatePresence>
        {showResult && (
          <ResultBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ResultMessage>
              Based on your responses, the likelihood of you living in a fascist state is:
            </ResultMessage>
            <Percentage percent={percent}>{percent}%</Percentage>
          </ResultBox>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLink && (
          <ExplanationLink
            href="https://osbcontent.s3-eu-west-1.amazonaws.com/PC-00466.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            How did you get these results?
          </ExplanationLink>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showClosing && (
          <ClosingParagraph
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Fascism thrives when ordinary people stay silent—your voice, your refusal to comply, and your defense of the vulnerable are acts of resistance. Even small courage is contagious.
          </ClosingParagraph>
        )}
      </AnimatePresence>
      {showClosing && (
        <SocialLinks>
          <SocialButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Share on Facebook"
          >
            <FacebookIcon />
          </SocialButton>
          <SocialButton
            href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Instagram"
            title="Share on Instagram"
          >
            <InstagramIcon />
          </SocialButton>
          <SocialButton
            href={`https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on TikTok"
            title="Share on TikTok"
          >
            <TikTokIcon />
          </SocialButton>
          <CopyButton onClick={handleCopy} title="Copy link to share">
            {copied ? '✅' : '🔗'}
          </CopyButton>
        </SocialLinks>
      )}
    </Container>
  );
} 