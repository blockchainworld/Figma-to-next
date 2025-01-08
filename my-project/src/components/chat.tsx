'use client'
import { useState } from 'react'
import { Client } from "@langchain/langgraph-sdk"

interface Message {
  role: 'user' | 'assistant'
  content: string
  id?: string
}

interface ChatProps {
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_VENUS_URL
      const apiKey = process.env.NEXT_PUBLIC_API_TOKEN

      if (!apiUrl || !apiKey) {
        throw new Error("Chatbot API Key or URL Missing.")
      }

      const client = new Client({
        apiUrl: apiUrl,
        apiKey: apiKey,
        timeoutMs: 30000,
      })

      const assistants = await client.assistants.search({
        metadata: null,
        offset: 0,
        limit: 10,
      })

      const agent = assistants[0]
      const thread = await client.threads.create()

      const streamResponse = client.runs.stream(
        thread["thread_id"],
        agent["assistant_id"],
        {
          input: { 
            messages: [{ role: "human", content: input.trim() }] 
          },
        }
      )

      for await (const chunk of streamResponse) {
        if (chunk.event === "values") {
          if (chunk.data.messages.length > 1 && chunk.data.messages[1].type === "ai") {
            const answer = chunk.data.messages[1].content
            
            setMessages(prev => {
              const newMessages = [...prev]
              const lastMessage = newMessages[newMessages.length - 1]
              
              if (lastMessage && lastMessage.role === 'assistant') {
                lastMessage.content = answer
              } else {
                newMessages.push({
                  role: 'assistant',
                  content: answer
                })
              }
              
              return [...newMessages]
            })
          }
        }
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `错误: ${error instanceof Error ? error.message : '未知错误'}`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-[800px] h-[80vh] flex flex-col rounded-2xl border-glow">
        {/* Header with gradient */}
        <div className="header-gradient flex justify-between items-center p-4 rounded-t-2xl border-b border-white/10">
          <h3 className="text-xl font-semibold text-glow font-['Marcellus']">智富匯AI</h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-300"
          >
            ✕
          </button>
        </div>
        
        {/* Messages with custom scrollbar */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 styled-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#4D3589] to-[#6C22BD] text-white shadow-lg'
                    : 'glass-effect text-white/90'
                } shadow-sm transition-all duration-300 hover:shadow-md`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass-effect text-white/90 rounded-2xl p-4 shadow-sm animate-pulse">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"/>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100"/>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200"/>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input section */}
        <div className="border-t border-white/10 p-4 glass-effect rounded-b-2xl">
          <form onSubmit={handleSubmit} className="max-w-[95%] mx-auto">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入消息..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 
                  text-base text-white 
                  placeholder:text-white/50
                  focus:outline-none focus:ring-2 focus:ring-[#6C22BD] focus:border-transparent
                  caret-[#AED2FD]
                  appearance-none
                  leading-normal
                  transition-all duration-300"
                style={{
                  caretColor: '#AED2FD',
                  backdropFilter: 'blur(8px)',
                }}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#4D3589] to-[#6C22BD] text-white 
                  px-8 py-3 rounded-full 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all duration-300
                  text-base font-medium
                  hover:shadow-lg hover:from-[#6C22BD] hover:to-[#4D3589]
                  focus:ring-2 focus:ring-[#6C22BD] focus:ring-offset-2 focus:ring-offset-[#1A1644]"
              >
                发送
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat