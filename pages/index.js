import { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import AuthorCard from '../components/AuthorCard';
import BigQuestionSection from '../components/BigQuestionSection';
import FascistLeadersBanner from '../components/FascistLeadersBanner';
import FinalSection from '../components/FinalSection';
import Head from 'next/head';
import Image from 'next/image';

const questions = [
  { text: "I believe it's important for everyone to rally around shared symbols—flags, anthems, mottos—because they hold a nation together like glue. 🏳️", icon: "🏳️" },
  { text: "I sometimes think certain kinds of people seem to get away with more, while others get treated like they're worth less. ⚖️", icon: "⚖️" },
  { text: "I feel safer when those in charge clearly identify who's \"with us\" and who might be working against the greater good. 🛡️", icon: "🛡️" },
  { text: "I think a strong country is one where the military is visible, respected, and central to how the nation presents itself. 🎖️", icon: "🎖️" },
  { text: "Men and women have different natural roles, and trying to erase that only causes confusion. 👥", icon: "👥" },
  { text: "I usually feel like the media speaks with one voice—like the story's already been written before it's told. 📰", icon: "📰" },
  { text: "Security should always come before personal freedoms. Safety is the foundation; everything else is built on that. 🔒", icon: "🔒" },
  { text: "I'm more comfortable when the values taught in church also guide the country's decisions. ⛪", icon: "⛪" },
  { text: "When big business succeeds, the country succeeds. That's just how economies thrive. 💼", icon: "💼" },
  { text: "Unions and protests often feel more like disruptions than progress. 🚫", icon: "🚫" },
  { text: "I've noticed people who ask too many deep or critical questions often end up pushed aside. ❓", icon: "❓" },
  { text: "Justice means consequences. You can't run a clean house without a firm hand. ⚖️", icon: "⚖️" },
  { text: "I'd rather trust someone who hires people they know than someone who risks bringing in strangers who might not be loyal. 🤝", icon: "🤝" },
  { text: "Elections are mostly fine, but sometimes it feels like the outcome is already shaped before I vote. 🗳️", icon: "🗳️" }
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
  max-width: 800px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 1rem;
`;

const Progress = styled.div`
  height: 100%;
  background: #007bff;
  border-radius: 2px;
  width: ${props => (props.progress * 100)}%;
  transition: width 0.3s ease;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const BannerWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
`;

const ArrowIcon = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(5px);
  }
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
    console.log('Answered question', currentQuestion, 'with', answer, 'answers so far:', newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      console.log('Next question:', currentQuestion + 1);
    } else {
      setShowResult(true);
      console.log('All questions answered, showing result and author next');
      setTimeout(() => {
        setShowAuthor(true);
        console.log('Showing author section');
      }, 1000);
    }
  };

  const handleSkip = () => {
    setShowAuthor(true);
    console.log('Skipped to author section');
  };

  const handleSkipBanner = () => {
    setShowLeadersBanner(true);
    setShowAuthor(false);
    setShowBigQuestion(false);
    setShowResult(false);
    console.log('Skipped to leaders banner and final section');
  };

  const handleContinueFromAuthor = () => {
    setShowBigQuestion(true);
    console.log('Continuing from author to big question section');
  };

  const handleBigQuestionFinish = () => {
    setShowLeadersBanner(true);
    console.log('Big question finished, showing leaders banner and final section');
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    return Math.round((total / (answers.length * 4)) * 100);
  };

  const progress = currentQuestion / questions.length;

  // Debug render logs
  if (showLeadersBanner) {
    console.log('Rendering leaders banner and final section');
  }

  return (
    <Container>
      <Head>
        <title>History Will Repeat</title>
        <meta name="description" content="A political questionnaire to help understand fascism" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon_ioapple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_iofavicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicon_io/site.webmanifest" />
      </Head>

      {!showResult && (
        <>
          <Header>
            <Title>Please answer this anonymous survey</Title>
            <Subtitle>None of this information is recorded</Subtitle>
          </Header>

          <ProgressBar>
            <Progress progress={progress} />
          </ProgressBar>
        </>
      )}

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
            <FinalSection answers={answers} totalQuestions={questions.length} />
          </motion.div>
        )}
        {!showResult && !showAuthor && !showBigQuestion && !showLeadersBanner && (
          <QuestionCard
            question={questions[currentQuestion].text}
            onAnswer={handleAnswer}
            index={currentQuestion}
          />
        )}
      </AnimatePresence>
    </Container>
  );
} 