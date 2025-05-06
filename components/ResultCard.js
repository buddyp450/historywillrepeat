import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Score = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #444;
`;

const Percentage = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #444;
`;

const FascistLabel = styled.h1`
  color: #ff0000;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Adolf_Hitler_cropped_restored.jpg/800px-Adolf_Hitler_cropped_restored.jpg');
  background-size: cover;
  background-position: center;
  opacity: ${props => props.opacity};
  transition: opacity 0.5s ease;
  z-index: 0;
`;

export default function ResultCard({ score, totalQuestions }) {
  const percentage = (score / (totalQuestions * 4)) * 100;
  const isPerfect = percentage === 100;

  return (
    <>
      <BackgroundImage opacity={percentage / 100} />
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Your Results</Title>
        <Score>Score: {score}/{(totalQuestions * 4)}</Score>
        <Percentage>Percentage: {percentage.toFixed(1)}%</Percentage>
        {isPerfect && <FascistLabel>100% Fascist</FascistLabel>}
      </Card>
    </>
  );
} 