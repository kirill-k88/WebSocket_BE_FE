import { useEffect, useRef, useState } from 'react';
import { Form } from '../From/From';
import { Message } from '../Message/Message';
import { IMessage } from '../Message/types/types';

import './App.css';

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:5001');

    wsRef.current.onopen = () => {
      console.log('Подключение к webSocket открылось');
      if (wsRef.current) {
        wsRef.current.send(
          JSON.stringify({
            event: 'connection',
            id: new Date(),
            message: 'Подключение к webSocket открылось'
          })
        );
      }
    };

    wsRef.current.onclose = () => {
      console.log('Подключение к webSocket закрылось');
    };

    wsRef.current.onerror = err => {
      console.log('ошибка при работе с webSocket: ', err);
    };

    wsRef.current.onmessage = e => {
      console.log('Получено сообение от wsServer', e.data);
      const msg = JSON.parse(e.data);
      setMessages(m => [msg, ...m]);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event: 'message', id: new Date(), message: newMessage }));
    }
  }, [newMessage]);

  return (
    <>
      <h1>Чат</h1>
      <Form setNewMessage={setNewMessage} />
      {messages &&
        messages.map(m => (
          <Message
            key={m.id}
            id={m.id}
            text={m.message}
          />
        ))}
    </>
  );
}

export default App;
