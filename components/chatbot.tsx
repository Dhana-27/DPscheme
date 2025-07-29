"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  schemes?: any[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI assistant for finding grants and loans. I can help you discover schemes based on your needs. What type of funding are you looking for?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock AI responses based on user input
  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("business") || lowerMessage.includes("startup")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Great! I found several business funding options for you. Here are some relevant schemes:",
        timestamp: new Date(),
        schemes: [
          {
            name: "PM Mudra Yojana",
            type: "Loan",
            amount: "Up to ₹10 Lakhs",
            description: "Micro-finance scheme for small businesses",
          },
          {
            name: "Startup India Seed Fund",
            type: "Grant",
            amount: "Up to ₹50 Lakhs",
            description: "Seed funding for DPIIT recognized startups",
          },
        ],
      }
    }

    if (lowerMessage.includes("agriculture") || lowerMessage.includes("farming") || lowerMessage.includes("farmer")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I found some excellent agricultural schemes for you:",
        timestamp: new Date(),
        schemes: [
          {
            name: "PM Kisan Samman Nidhi",
            type: "Grant",
            amount: "₹6,000 per year",
            description: "Direct income support to farmers",
          },
          {
            name: "Kisan Credit Card",
            type: "Loan",
            amount: "Based on crop requirement",
            description: "Credit facility for agricultural needs",
          },
        ],
      }
    }

    if (lowerMessage.includes("education") || lowerMessage.includes("student") || lowerMessage.includes("study")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Here are some education-related funding options:",
        timestamp: new Date(),
        schemes: [
          {
            name: "Education Loan Scheme",
            type: "Loan",
            amount: "Up to ₹20 Lakhs",
            description: "Loans for higher education in India and abroad",
          },
        ],
      }
    }

    if (lowerMessage.includes("woman") || lowerMessage.includes("women")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I found schemes specifically for women entrepreneurs:",
        timestamp: new Date(),
        schemes: [
          {
            name: "Stand Up India Scheme",
            type: "Loan",
            amount: "₹10 Lakhs - ₹1 Crore",
            description: "Bank loans for women entrepreneurs",
          },
        ],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "I understand you're looking for funding options. Could you please provide more details about:\n\n• What type of funding do you need? (Business, Agriculture, Education, etc.)\n• What's your approximate funding requirement?\n• Are you an individual, business owner, or part of a specific category?\n\nThis will help me find the most suitable schemes for you!",
      timestamp: new Date(),
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 border-green-200">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>AI Scheme Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[440px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "bot" && <Bot className="h-4 w-4 mt-1 text-green-600" />}
                      {message.type === "user" && <User className="h-4 w-4 mt-1" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>

                        {/* Display schemes if available */}
                        {message.schemes && (
                          <div className="mt-3 space-y-2">
                            {message.schemes.map((scheme, index) => (
                              <div key={index} className="bg-white rounded-lg p-3 border border-green-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-green-900 text-sm">{scheme.name}</h4>
                                  <Badge
                                    variant={scheme.type === "Grant" ? "default" : "secondary"}
                                    className={`text-xs ${scheme.type === "Grant" ? "bg-green-600" : "bg-blue-600"}`}
                                  >
                                    {scheme.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{scheme.description}</p>
                                <p className="text-xs font-medium text-green-600">{scheme.amount}</p>
                              </div>
                            ))}
                            <Button
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700 text-xs"
                              onClick={() => window.open("/search", "_blank")}
                            >
                              View All Schemes
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about grants and loans..."
                  className="flex-1 border-green-300 focus:border-green-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-700"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
