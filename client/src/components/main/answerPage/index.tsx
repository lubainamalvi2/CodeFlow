import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getMetaData } from '../../../tool';
import AnswerView from './answer';
import AnswerHeader from './header';
import { Comment } from '../../../types';
import './index.css';
import QuestionBody from './questionBody';
import VoteComponent from '../voteComponent';
import CommentSection from '../commentSection';
import useAnswerPage from '../../../hooks/useAnswerPage';
import HoverToPlayTTSWrapper from '../../textToSpeech/textToSpeechComponent';
import formatDateToHumanReadable from '../../../utils/date.utils';

/**
 * AnswerPage component that displays the full content of a question along with its answers.
 * It also includes the functionality to vote, ask a new question, and post a new answer.
 */
const AnswerPage = () => {
  const { questionID, question, handleNewComment, handleNewAnswer } = useAnswerPage();
  const [showAIAnswer, setShowAIAnswer] = useState<boolean>(false);

  if (!question) {
    return null;
  }

  const aiAnswer =
    question.aiGeneratedAnswer !== undefined
      ? question.aiGeneratedAnswer
      : 'AI generated answer is not available';

  const questionOverview = `${question.askedBy} asked a question about ${question.title} on ${formatDateToHumanReadable(question.askDateTime)}. Question has ${question.views.length} views, ${question.answers.length} answers, ${question.upVotes.length} upvotes, and ${question.downVotes.length} downvotes.`;

  return (
    <>
      <HoverToPlayTTSWrapper text={questionOverview}>
        <VoteComponent question={question} />
      </HoverToPlayTTSWrapper>
      <AnswerHeader ansCount={question.answers.length} title={question.title} />
      <QuestionBody
        views={question.views.length}
        text={question.text}
        askby={question.askedBy}
        meta={getMetaData(new Date(question.askDateTime))}
      />
      <CommentSection
        comments={question.comments}
        handleAddComment={(comment: Comment) => handleNewComment(comment, 'question', questionID)}
      />
      {question.answers.map((a, idx) => (
        <AnswerView
          key={idx}
          text={a.text}
          ansBy={a.ansBy}
          meta={getMetaData(new Date(a.ansDateTime))}
          comments={a.comments}
          handleAddComment={(comment: Comment) => handleNewComment(comment, 'answer', a._id)}
        />
      ))}
      <HoverToPlayTTSWrapper text='Button for Answer Question'>
        <button
          className='bluebtn ansButton'
          onClick={() => {
            handleNewAnswer();
          }}>
          Answer Question
        </button>
      </HoverToPlayTTSWrapper>
      <div className='comment-section'>
        <HoverToPlayTTSWrapper text='Button for showing AI-generated answer'>
          <button className='toggle-button' onClick={() => setShowAIAnswer(!showAIAnswer)}>
            {showAIAnswer ? 'Hide AI Answer' : 'Show AI Answer'}
          </button>
        </HoverToPlayTTSWrapper>
        {showAIAnswer && (
          <div className='answer right_padding'>
            <div className='answerText'>
              <HoverToPlayTTSWrapper text={aiAnswer}>
                <div id='answerText' className=''>
                  <ReactMarkdown>{aiAnswer}</ReactMarkdown>
                </div>
              </HoverToPlayTTSWrapper>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnswerPage;
