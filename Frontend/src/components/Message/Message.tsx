import { FC } from 'react';

import './Message.css';

interface IMessageProps {
  text: string;
  id: number;
}

export const Message: FC<IMessageProps> = ({ text, id }) => {
  return (
    <div className="message">
      <p className="message__id">{`# ${id ? id : ''}`}</p>
      <p className="message__text">{text}</p>
    </div>
  );
};
