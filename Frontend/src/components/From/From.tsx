import { ChangeEvent, Dispatch, FC, MouseEvent, useState } from 'react';

import './Form.css';

interface IFormProps {
  setNewMessage: Dispatch<React.SetStateAction<string>>;
}

export const Form: FC<IFormProps> = ({ setNewMessage }) => {
  const [text, setText] = useState<string>('');

  const sendBtnHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setNewMessage(text);
  };

  const onTextChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const msg = e.target.value;
    setText(msg);
  };

  return (
    <div className="form">
      <h2>Введите сообщение</h2>
      <input
        type="text-area"
        className="textArea"
        onChange={onTextChangeHandle}
      />
      <button
        type="button"
        onClick={sendBtnHandle}>
        Отправить
      </button>
    </div>
  );
};
