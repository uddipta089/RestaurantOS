import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

const VoiceOrder = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  let recognition = null;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = async (event) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        setIsListening(false);
        setFeedback('Processing your order...');

        try {
          // Send transcribed text to our backend AI matching controller
          const response = await apiClient.post('/ai/voice-order', { spokenText: currentTranscript });
          const matchedItems = response.data.data;
          
          if (matchedItems.length > 0) {
            // Automatically add the first best match to the cart
            dispatch(addItem({ menuItem: matchedItems[0], price: matchedItems[0].price }));
            setFeedback(`Added ${matchedItems[0].name} to cart!`);
          }
        } catch (error) {
          setFeedback('Sorry, we could not match that to a menu item.');
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setFeedback('Microphone error. Please try again.');
      };
    }
  }, []);

  const handleToggleListen = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedback('');
      recognition?.start();
      setIsListening(true);
    }
  };

  if (!('webkitSpeechRecognition' in window)) {
    return <div className="text-sm text-red-500">Voice ordering not supported in this browser.</div>;
  }

  return (
    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-orange-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          Voice Ordering
        </h3>
        <p className="text-sm text-orange-600 mt-1">
          {isListening ? "Listening... (Say 'I want a classic burger')" : (feedback || "Tap the mic and speak your order")}
        </p>
        {transcript && <p className="text-xs text-gray-500 mt-2 italic">"{transcript}"</p>}
      </div>
      
      <button 
        onClick={handleToggleListen}
        className={`p-4 rounded-full shadow-md transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
      </button>
    </div>
  );
};

export default VoiceOrder;
