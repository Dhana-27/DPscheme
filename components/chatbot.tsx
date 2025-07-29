"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, ExternalLink } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  schemes?: Array<{
    name: string
    type: string
    amount: string
    url: string
  }>
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your SchemeConnect assistant. I can help you find the perfect grants and loans for your needs. What type of funding are you looking for?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    // Business loan queries
    if (lowerMessage.includes("business") || lowerMessage.includes("loan")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I found some great business loan options for you! Here are the top schemes:",
        timestamp: new Date(),
        schemes: [
          {
            name: "PM Mudra Yojana",
            type: "Loan",
            amount: "Up to ₹10 Lakhs",
            url: "https://www.mudra.org.in/",
          },
          {
            name: "SBI Business Loan",
            type: "Loan",
            amount: "Up to ₹50 Lakhs",
            url: "https://sbi.co.in/",
          },
        ],
      }
    }

    // Startup queries
    if (lowerMessage.includes("startup") || lowerMessage.includes("entrepreneur")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Perfect! Here are some excellent startup funding schemes:",
        timestamp: new Date(),
        schemes: [
          {
            name: "Startup India Seed Fund",
            type: "Grant",
            amount: "Up to ₹50 Lakhs",
            url: "https://www.startupindia.gov.in/",
          },
          {
            name: "SIDBI Startup Loan",
            type: "Loan",
            amount: "Up to ₹1 Crore",
            url: "https://www.sidbi.in/",
          },
        ],
      }
    }

    // Women entrepreneur queries
    if (lowerMessage.includes("women") || lowerMessage.includes("female")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Great! Here are schemes specifically for women entrepreneurs:",
        timestamp: new Date(),
        schemes: [
          {
            name: "SBI Women Entrepreneur Loan",
            type: "Loan",
            amount: "Up to ₹2 Crores",
            url: "https://sbi.co.in/",
          },
          {
            name: "Mahila Udyam Nidhi Scheme",
            type: "Grant",
            amount: "Up to ₹10 Lakhs",
            url: "#",
          },
        ],
      }
    }

    // Agriculture queries
    if (lowerMessage.includes("agriculture") || lowerMessage.includes("farming") || lowerMessage.includes("farmer")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Here are some agricultural funding schemes that might help:",
        timestamp: new Date(),
        schemes: [
          {
            name: "PM Kisan Credit Card",
            type: "Loan",
            amount: "Up to ₹3 Lakhs",
            url: "https://pmkisan.gov.in/",
          },
          {
            name: "Agriculture Infrastructure Fund",
            type: "Grant",
            amount: "Up to ₹2 Crores",
            url: "#",
          },
        ],
      }
    }

    // Education queries
    if (lowerMessage.includes("education") || lowerMessage.includes("student") || lowerMessage.includes("study")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Here are education funding options available:",
        timestamp: new Date(),
        schemes: [
          {
            name: "Education Loan Scheme",
            type: "Loan",
            amount: "Up to ₹20 Lakhs",
            url: "#",
          },
          {
            name: "Merit Scholarship",
            type: "Grant",
            amount: "Up to ₹50,000",
            url: "#",
          },
        ],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "I can help you find schemes for various categories like business loans, startup grants, women entrepreneur schemes, agriculture funding, and education loans. Could you tell me more about what specific type of funding you're looking for?",
      timestamp: new Date(),
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = ["Business loans", "Startup grants", "Women entrepreneur schemes", "Agriculture funding"]

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
          size="lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 shadow-2xl">
          <Card className="h-full flex flex-col border-green-200">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                SchemeConnect Assistant
              </CardTitle>
              <p className="text-green-100 text-sm">Find the perfect grants and loans</p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "bot" && <Bot className="w-4 h-4 mt-0.5 text-green-600" />}
                        {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>

                          {/* Scheme Cards */}
                          {message.schemes && (
                            <div className="mt-3 space-y-2">
                              {message.schemes.map((scheme, index) => (
                                <div key={index} className="bg-white border border-green-200 rounded-lg p-3">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-gray-900 text-sm">{scheme.name}</h4>
                                    <Badge
                                      variant={scheme.type === "Grant" ? "default" : "secondary"}
                                      className={`text-xs ${
                                        scheme.type === "Grant" ? "bg-green-100 text-green-800" : ""
                                      }`}
                                    >
                                      {scheme.type}
                                    </Badge>
                                  </div>
                                  <p className="text-green-600 font-semibold text-sm mb-2">{scheme.amount}</p>
                                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-xs" asChild>
                                    <a
                                      href={scheme.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1"
                                    >
                                      Apply Now
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-green-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                        onClick={() => {
                          setInputValue(action)
                          handleSendMessage()
                        }}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about grants and loans..."
                    className="flex-1 border-green-200 focus:border-green-500"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
