"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. I can help you find the perfect grants and loans for your business. What are you looking for?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("grant") || input.includes("government")) {
      return "I can help you find government grants! You can search by state, district, or category. Would you like to explore grants for startups, women entrepreneurs, or agriculture?"
    }

    if (input.includes("loan") || input.includes("bank")) {
      return "Looking for loans? I can help you find options from both public and private banks. What type of loan are you interested in - business, personal, or agriculture?"
    }

    if (input.includes("startup")) {
      return "Great! For startups, I recommend checking out the Startup India Seed Fund (up to ₹50 lakhs) and various state-specific startup grants. Would you like me to show you startup-friendly loans as well?"
    }

    if (input.includes("business")) {
      return "For business funding, you have multiple options: PM Mudra Yojana (up to ₹10 lakhs), SBI Business Loans (up to ₹50 lakhs), and various state grants. What's your business category?"
    }

    return "I can help you find the perfect funding opportunity! Try asking about grants, loans, or specific categories like startups, women entrepreneurs, or agriculture."
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-dpurpose-gradient hover:opacity-90 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-80 h-96 sm:w-96 sm:h-[500px]"
      }`}
    >
      <Card className="h-full border-dpurpose-light shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-dpurpose-gradient text-white rounded-t-lg">
          <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user" ? "bg-dpurpose-gradient text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about grants, loans, or funding..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border-dpurpose-light focus:border-dpurpose-dark"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-dpurpose-gradient hover:opacity-90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
