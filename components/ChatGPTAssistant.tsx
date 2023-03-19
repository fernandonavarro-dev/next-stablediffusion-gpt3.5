import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { ExpandCollapseToggle } from './ExpandCollapseToggle';

type MessageObject = {
  message: string;
  direction?: string;
  sender: string;
  sentTime?: string;
};

const systemMessage = {
  role: 'system',
  content:
    "You are an AI trained to assist with prompt engineering and generating images using generative AI. Provide only the prompt text for generating images. Explain concepts like you're addressing a junior/mid-level web developer.",
};

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function ChatGPTAssistant() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageObject[]>([
    {
      message:
        "Hello, I'm ChatGPT! Let me know if you need help with your prompts!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [expanded, setExpanded] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;
    const formattedInputValue = `Give me a prompt for ${inputValue}`;
    await handleSend(formattedInputValue);
    setInputValue('');
  };

  // Add a function to toggle the expand/collapse state
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSend = async (message: string) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: MessageObject[]) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject: MessageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from the ChatGPT API');
      }

      const data = await response.json();
      console.log(data);
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: 'ChatGPT',
        },
      ]);
      setTyping(false);
    } catch (error) {
      console.error(error);
      setTyping(false);
    }
  }

  function formatAssistantMessage(message: string) {
    const parts = message.split(/("[^"]+")/);
    return parts.map((part, index) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <>
            <br key={`before-${index}`} />
            <p key={index} className="mb-0 mt-2 font-bold">
              {part.slice(1, -1)}
            </p>
            <br key={`after-${index}`} />
          </>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <div
      className={`fixed bottom-3 right-4 w-2/5 ${
        expanded ? 'h-96' : 'h-16'
      } bg-gray-800 p-4 rounded-lg shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold mb-4">
          ChatGPT Prompt Assistant
        </div>
        <ExpandCollapseToggle
          expanded={expanded}
          onToggleExpand={handleToggleExpand}
        />
      </div>

      {expanded && (
        <>
          <div className="h-64 overflow-y-auto mb-4 p-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}
              >
                <span
                  className={
                    message.sender === 'user'
                      ? 'text-blue-400'
                      : 'text-green-400'
                  }
                >
                  {message.sender === 'user' ? 'You: ' : 'Assistant: '}
                </span>
                {message.sender === 'ChatGPT'
                  ? formatAssistantMessage(message.message)
                  : message.message}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              className="flex-grow bg-gray-700 text-gray-200 rounded-l-lg p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 p-2 rounded-r-lg">
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ChatGPTAssistant;
