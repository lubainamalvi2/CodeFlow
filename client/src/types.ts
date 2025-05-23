import { Socket } from 'socket.io-client';

export type FakeSOSocket = Socket<ServerToClientEvents>;

/**
 * Represents the settingsInfo in the application.
 * @property theme - the currently selected color theme
 * @property textSize - the currently selected size of the text
 * @property textBoldness - the currently selcted text boldness
 * @property font - the currently selcted font style for text
 * @property lineSpacing - the currently selcted line spacing for all text
 * @property backgroundColor - the currently selected background color for the custom theme option
 * @property textColor - the currently selected text color for the custom theme option
 * @property buttonColor - the currently selected button color for the custom theme option
 */
export interface SettingsInfo {
  theme: ThemeType;
  textSize: TextSizeType;
  textBoldness: TextBoldnessType;
  font: FontType;
  lineSpacing: LineSpacingType;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
}

/**
 * Represents a user in the application.
 *
 * @property username - The username of the user, or a generic name for a non-logged in user.
 * @property email - The email address of a logged in user. Optional field.
 * @property password - The password of a logged in user. Optional field.
 * @property creationDateTime - The date and time when a logged in user was created. Optional field.
 * @property settings - the theme and text settings for the current user. Optional field.
 */
export interface User {
  username: string;
  email?: string;
  password?: string;
  creationDateTime?: Date;
  settings?: SettingsInfo;
}

export type ThemeType = 'LightMode' | 'DarkMode' | 'Pastel' | 'Autumn' | 'Custom';
export type FontType = 'Arial' | 'Times New Roman' | 'Courier New';
export type TextSizeType = 'small' | 'medium' | 'large' | 'x-large';
export type TextBoldnessType = 'normal' | 'bold';
export type LineSpacingType = '1' | '2' | '3' | '4';

/**
 * Enum representing the possible ordering options for questions.
 * and their display names.
 */
export const orderTypeDisplayName = {
  newest: 'Newest',
  unanswered: 'Unanswered',
  active: 'Active',
  mostViewed: 'Most Viewed',
} as const;

/**
 * Type representing the keys of the orderTypeDisplayName object.
 * This type can be used to restrict values to the defined order types.
 */
export type OrderType = keyof typeof orderTypeDisplayName;

/**
 * Interface represents a comment.
 *
 * text - The text of the comment.
 * commentBy - Username of the author of the comment.
 * commentDateTime - Time at which the comment was created.
 */
export interface Comment {
  text: string;
  commentBy: string;
  commentDateTime: Date;
}

/**
 * Interface representing a tag associated with a question.
 *
 * @property name - The name of the tag.
 * @property description - A description of the tag.
 */
export interface Tag {
  _id?: string;
  name: string;
  description: string;
}

/**
 * Interface represents the data for a tag.
 *
 * name - The name of the tag.
 * qcnt - The number of questions associated with the tag.
 */
export interface TagData {
  name: string;
  qcnt: number;
}

/**
 * Interface representing the voting data for a question, which contains:
 * - qid - The ID of the question being voted on
 * - upVotes - An array of user IDs who upvoted the question
 * - downVotes - An array of user IDs who downvoted the question
 */
export interface VoteData {
  qid: string;
  upVotes: string[];
  downVotes: string[];
}

/**
 * Interface representing an Answer document, which contains:
 * - _id - The unique identifier for the answer. Optional field
 * - text - The content of the answer
 * - ansBy - The username of the user who wrote the answer
 * - ansDateTime - The date and time when the answer was created
 * - comments - Comments associated with the answer.
 */
export interface Answer {
  _id?: string;
  text: string;
  ansBy: string;
  ansDateTime: Date;
  comments: Comment[];
}

/**
 * Interface representing the structure of a Question object.
 *
 * - _id - The unique identifier for the question.
 * - tags - An array of tags associated with the question, each containing a name and description.
 * - answers - An array of answers to the question
 * - title - The title of the question.
 * - views - An array of usernames who viewed the question.
 * - text - The content of the question.
 * - askedBy - The username of the user who asked the question.
 * - askDateTime - The date and time when the question was asked.
 * - upVotes - An array of usernames who upvoted the question.
 * - downVotes - An array of usernames who downvoted the question.
 * - comments - Comments associated with the question.
 */
export interface Question {
  _id?: string;
  tags: Tag[];
  aiGeneratedAnswer?: string;
  answers: Answer[];
  title: string;
  views: string[];
  text: string;
  askedBy: string;
  askDateTime: Date;
  upVotes: string[];
  downVotes: string[];
  comments: Comment[];
}

/**
 * Interface representing the payload for a vote update socket event.
 */
export interface VoteUpdatePayload {
  qid: string;
  upVotes: string[];
  downVotes: string[];
}

export interface AnswerUpdatePayload {
  qid: string;
  answer: Answer;
}

export interface CommentUpdatePayload {
  result: Question | Answer;
  type: 'question' | 'answer';
}

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  questionUpdate: (question: Question) => void;
  answerUpdate: (update: AnswerUpdatePayload) => void;
  viewsUpdate: (question: Question) => void;
  voteUpdate: (vote: VoteUpdatePayload) => void;
  commentUpdate: (update: CommentUpdatePayload) => void;
}
