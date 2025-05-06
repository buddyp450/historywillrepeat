# Fascist Tendency Questionnaire

A Next.js application that presents users with a series of questions to measure their fascist tendencies. The application features smooth animations, a progress bar, and a dramatic results page.

## Features

- 14 carefully crafted questions about fascist tendencies
- 5-point Likert scale for answers
- Smooth slide transitions between questions
- Progress bar showing completion status
- Dramatic results page with:
  - Score calculation
  - Percentage display
  - Dynamic background image
  - Special message for perfect scores

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js
- React
- Emotion (for styled components)
- Framer Motion (for animations)

## Project Structure

```
myQuestionnaireWebsite/
├── components/
│   ├── QuestionCard.js
│   └── ResultCard.js
├── pages/
│   ├── _app.js
│   └── index.js
├── styles/
│   └── globals.css
└── package.json
```

## Development

To modify the questions or styling:

1. Questions are defined in `pages/index.js`
2. Styling can be modified in the component files or `styles/globals.css`
3. Animations can be adjusted in the component files using Framer Motion

## License

ISC 