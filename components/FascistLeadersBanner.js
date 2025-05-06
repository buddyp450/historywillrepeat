import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalSection from './FinalSection';

const leaders = [
  {
    name: 'Adolf Hitler',
    country: 'Germany',
    img: '/assets/hitler.jpg',
    blurb: 'Dictator of Nazi Germany, known for initiating World War II and orchestrating the Holocaust; maintained a carefully curated public image of charisma and order.'
  },
  {
    name: 'Benito Mussolini',
    country: 'Italy',
    img: '/assets/mussolini.png',
    blurb: 'Founder of Italian Fascism, ruled as Prime Minister and later dictator; projected an image of heroic nationalism and personal strength.'
  },
  {
    name: 'Francisco Franco',
    country: 'Spain',
    img: '/assets/franco.jpg',
    blurb: 'Military general who led a fascist regime in Spain after the civil war; emphasized stability, tradition, and authoritarian unity.'
  },
  {
    name: 'Suharto',
    country: 'Indonesia',
    img: '/assets/suharto.png',
    blurb: 'Seized power after a violent purge of communists; ruled as a military-backed authoritarian for over three decades, known as the "Smiling General."'
  },
  {
    name: 'Augusto Pinochet',
    country: 'Chile',
    img: '/assets/augusto.png',
    blurb: 'Led a military coup in 1973 and ruled as dictator; oversaw economic liberalization alongside widespread human rights violations.'
  }
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 2rem 0;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const HeaderText = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: #222;
  margin: 0;
  text-align: center;
`;

const Banner = styled.div`
  width: 100%;
  height: 45vh;
  min-height: 320px;
  display: flex;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  border-radius: 18px;
  overflow: visible;
  background: #f7f7f7;
  padding-left: 4rem;
  padding-right: 4rem;
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    min-height: 0;
    border-radius: 0;
    width: 100vw;
    padding-left: 0;
    padding-right: 0;
  }
`;

const Section = styled.div`
  flex: ${({ expanded }) => (expanded ? 2.5 : 1)};
  min-width: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
  transition: flex 0.4s cubic-bezier(.77,0,.18,1), background 0.3s;
  background: ${({ expanded }) => (expanded ? '#fff' : '#ececec')};
  cursor: pointer;
  box-shadow: ${({ expanded }) => (expanded ? '0 4px 24px rgba(0,0,0,0.10)' : 'none')};
  z-index: ${({ expanded }) => (expanded ? 2 : 1)};
  overflow: hidden;
  @media (max-width: 900px) {
    flex: none;
    width: 100vw;
    min-height: 220px;
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
  }
`;

const ExpandIcon = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    z-index: 2;
    opacity: ${({ expanded }) => (expanded ? 0 : 1)};
    transition: opacity 0.3s ease;
  }
`;

const LeaderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ expanded }) => (expanded ? 'none' : 'grayscale(60%) blur(1px)')};
  transition: filter 0.3s;
  @media (max-width: 900px) {
    height: 220px;
    min-height: 180px;
    max-height: 260px;
  }
`;

const Blurb = styled.div`
  display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 2rem 2rem 1.5rem;
  width: 320px;
  max-width: calc(100vw / 5);
  background: rgba(255,255,255,0.97);
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  z-index: 3;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
  overflow: auto;
  @media (max-width: 900px) {
    position: static;
    width: 100vw;
    min-width: 0;
    height: auto;
    box-shadow: none;
    padding: 1.2rem 1rem;
    align-items: flex-start;
    max-width: 100vw;
  }
`;

const Name = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #222;
`;

const Country = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const BlurbText = styled.div`
  font-size: 1.05rem;
  color: #333;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export default function FascistLeadersBanner() {
  const [expanded, setExpanded] = useState(0);

  return (
    <Wrapper style={{ position: 'relative' }}>
      <HeaderRow>
        <HeaderText>
          What first came to your mind? Probably Hitler, but there's more...
        </HeaderText>
      </HeaderRow>
      <Banner>
        {leaders.map((leader, i) => (
          <Section
            key={leader.name}
            expanded={expanded === i}
            onMouseEnter={() => setExpanded(i)}
            onTouchStart={() => setExpanded(i)}
            onFocus={() => setExpanded(i)}
            tabIndex={0}
            aria-label={leader.name}
          >
            <LeaderImg src={leader.img} alt={leader.name} expanded={expanded === i} />
            <ExpandIcon expanded={expanded === i}>+</ExpandIcon>
            <Blurb expanded={expanded === i}>
              <Name>
                {leader.name} <span style={{ fontWeight: 400, color: '#888' }}>({leader.country})</span>
              </Name>
              <Country>{leader.country}</Country>
              <BlurbText>{leader.blurb}</BlurbText>
            </Blurb>
          </Section>
        ))}
      </Banner>
    </Wrapper>
  );
}