import { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import AuthorCard from '../components/AuthorCard';
import BigQuestionSection from '../components/BigQuestionSection';
import FascistLeadersBanner from '../components/FascistLeadersBanner';
import FinalSection from '../components/FinalSection';

const questions = [
  "I believe it's important for everyone to rally around shared symbols—flags, anthems, mottos—because they hold a nation together like glue.",
  "I sometimes think certain kinds of people seem to get away with more, while others get treated like they're worth less.",
  "I feel safer when those in charge clearly identify who's \"with us\" and who might be working against the greater good.",
  "I think a strong country is one where the military is visible, respected, and central to how the nation presents itself.",
  "Men and women have different natural roles, and trying to erase that only causes confusion.",
  "I usually feel like the media speaks with one voice—like the story's already been written before it's told.",
  "Security should always come before personal freedoms. Safety is the foundation; everything else is built on that.",
  "I'm more comfortable when the values taught in church also guide the country's decisions.",
  "When big business succeeds, the country succeeds. That's just how economies thrive.",
  "Unions and protests often feel more like disruptions than progress.",
  "I've noticed people who ask too many deep or critical questions often end up pushed aside.",
  "Justice means consequences. You can't run a clean house without a firm hand.",
  "I'd rather trust someone who hires people they know than someone who risks bringing in strangers who might not be loyal.",
  "Elections are mostly fine, but sometimes it feels like the outcome is already shaped before I vote."
];

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
  transition: background 0.5s ease;
  position: relative;
  overflow-x: hidden;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const SkipBannerButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #d32f2f;
  color: #d32f2f;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #d32f2f;
    color: white;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 600px;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: #007bff;
  width: ${props => (props.progress * 100)}%;
  transition: width 0.3s ease;
`;

const BannerWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const FinalSectionWrapper = styled.div`
  margin-top: 0;
`;

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showBigQuestion, setShowBigQuestion] = useState(false);
  const [showLeadersBanner, setShowLeadersBanner] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      setTimeout(() => {
        setShowAuthor(true);
      }, 1000);
    }
  };

  const handleSkip = () => {
    setShowAuthor(true);
  };

  const handleSkipBanner = () => {
    setShowLeadersBanner(true);
    setShowAuthor(false);
    setShowBigQuestion(false);
    setShowResult(false);
  };

  const handleContinueFromAuthor = () => {
    setShowBigQuestion(true);
  };

  const handleBigQuestionFinish = () => {
    setShowLeadersBanner(true);
  };

  return (
    <Container>
      <AnimatePresence mode="wait">
        {!showBigQuestion && showAuthor && !showLeadersBanner && (
          <motion.div
            key="author"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -1000, opacity: 0, transition: { duration: 0.8 } }}
            style={{ width: '100%' }}
          >
            <AuthorCard onContinue={handleContinueFromAuthor} />
          </motion.div>
        )}
        {showBigQuestion && !showLeadersBanner && (
          <motion.div
            key="bigquestion"
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
            exit={{ y: -1000, opacity: 0, transition: { duration: 0.8 } }}
            style={{ width: '100%' }}
          >
            <BigQuestionSection onFinish={handleBigQuestionFinish} />
          </motion.div>
        )}
        {showLeadersBanner && (
          <motion.div
            key="leadersbanner"
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
            exit={{ y: -1000, opacity: 0 }}
            style={{ width: '100%' }}
          >
            <BannerWrapper>
              <FascistLeadersBanner />
            </BannerWrapper>
            <FinalSectionWrapper>
              <FinalSection answers={answers} totalQuestions={questions.length} />
            </FinalSectionWrapper>
          </motion.div>
        )}
        {!showResult && !showAuthor && !showBigQuestion && !showLeadersBanner && (
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            index={currentQuestion}
          />
        )}
      </AnimatePresence>
    </Container>
  );
} 