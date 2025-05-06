import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const SectionContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

const BigText = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
`;

const QuestionText = styled(motion.div)`
  font-size: 2.2rem;
  font-weight: 500;
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const RedText = styled(motion.span)`
  color: #d32f2f;
  font-size: 3rem;
  font-weight: 800;
  margin-left: 1rem;
  display: inline-block;
`;

export default function BigQuestionSection({ onFinish }) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showHowDoI, setShowHowDoI] = useState(false);
  const [showFascism, setShowFascism] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowQuestion(true), 400);
    const t2 = setTimeout(() => setShowHowDoI(true), 2200);
    const t3 = setTimeout(() => setShowFascism(true), 4200);
    let t4;
    if (showFascism) {
      t4 = setTimeout(() => {
        if (onFinish) onFinish();
      }, 1200); // 700ms throb + 500ms
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showFascism, onFinish]);

  return (
    <SectionContainer>
      <AnimatePresence>
        {showQuestion && (
          <BigText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2 }}
          >
            Above all he's known for one question
          </BigText>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showHowDoI && (
          <QuestionText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.5 }}
          >
            How do I identify...
            {showFascism && (
              <RedText
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: [1, 1.18, 1] }}
                transition={{ duration: 0.7, times: [0, 0.5, 1] }}
              >
                FASCISM?
              </RedText>
            )}
          </QuestionText>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
} 