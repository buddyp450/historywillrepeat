import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin: 1rem;
`;

const GradientBar = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #ff4444, #ffbb33, #00C851, #33b5e5, #2BBBAD);
  border-radius: 30px;
  position: relative;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Section = styled.div`
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  @media (max-width: 600px) {
    display: none;
  }
`;

const RadioButton = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: ${props => props.selected ? 'white' : 'transparent'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }
`;

const InnerCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.selected ? props.color : 'transparent'};
  transition: all 0.2s;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Label = styled.div`
  width: 18%;
  text-align: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  margin-top: 2rem;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MobileButtonContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1.5rem 0;
  }
`;

const MobileButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.selected ? '#007bff' : '#f7f7f7'};
  color: ${props => props.selected ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  text-align: center;
  &:hover {
    background: ${props => props.selected ? '#0056b3' : '#e7e7e7'};
  }
`;

export default function QuestionCard({ question, onAnswer, index }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 600);
  }, []);

  const sections = [
    { label: "Strongly Disagree", color: "#ff4444" },
    { label: "Disagree", color: "#ffbb33" },
    { label: "Neutral", color: "#00C851" },
    { label: "Agree", color: "#33b5e5" },
    { label: "Strongly Agree", color: "#2BBBAD" }
  ];
  const displaySections = isMobile ? [...sections].reverse() : sections;

  const handleAnswer = (answer) => {
    onAnswer(answer);
    setSelectedAnswer(null);
  };

  return (
    <Card
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <QuestionText>{question}</QuestionText>
      {!isMobile && (
        <>
          <GradientBar>
            {displaySections.map((section, i) => (
              <Section
                key={i}
                onClick={() => handleAnswer(isMobile ? 4 - i : i)}
                role="radio"
                aria-checked={selectedAnswer === (isMobile ? 4 - i : i)}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAnswer(isMobile ? 4 - i : i);
                  }
                }}
              >
                <RadioButton selected={selectedAnswer === (isMobile ? 4 - i : i)}>
                  <InnerCircle selected={selectedAnswer === (isMobile ? 4 - i : i)} color={section.color} />
                </RadioButton>
              </Section>
            ))}
          </GradientBar>
          <Labels>
            {displaySections.map((section, i) => (
              <Label key={i}>{section.label}</Label>
            ))}
          </Labels>
        </>
      )}
      {isMobile && (
        <MobileButtonContainer>
          {displaySections.map((section, i) => (
            <MobileButton
              key={i}
              selected={selectedAnswer === (isMobile ? 4 - i : i)}
              onClick={() => handleAnswer(isMobile ? 4 - i : i)}
              role="radio"
              aria-checked={selectedAnswer === (isMobile ? 4 - i : i)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAnswer(isMobile ? 4 - i : i);
                }
              }}
            >
              {section.label}
            </MobileButton>
          ))}
        </MobileButtonContainer>
      )}
    </Card>
  );
} 