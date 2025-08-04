"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

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
      text: "Hello! I'm your AI assistant from Dpurpose Foundation. I can help you find grants and loans that match your needs. What type of funding are you looking for?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputMessage)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("grant") || input.includes("government")) {
      return "Great! I can help you find government grants. Here are some popular options:\n\n• PM Mudra Yojana - Up to ₹10 Lakhs for small businesses\n• Startup India Seed Fund - Up to ₹50 Lakhs for startups\n• State-specific grants based on your location\n\nWhich state are you located in? This will help me find more targeted grants for you."
    }

    if (input.includes("loan") || input.includes("bank")) {
      return "I can help you explore bank loans! We have options from both public and private banks:\n\n• Public Banks: SBI, PNB, Canara Bank (typically 7-12% interest)\n• Private Banks: HDFC, ICICI, Axis Bank (typically 9-16% interest)\n\nWhat type of loan are you looking for? Business, personal, agriculture, or startup?"
    }

    if (input.includes("business") || input.includes("startup")) {
      return "Perfect! For business and startup funding, I recommend:\n\n📋 **Grants:**\n• PM Mudra Yojana\n• Startup India Seed Fund\n• State startup policies\n\n🏦 **Loans:**\n• Business loans from SBI, HDFC\n• Startup-specific loan schemes\n• MSME loans\n\nWould you like me to show you specific options based on your business type and location?"
    }

    if (input.includes("agriculture") || input.includes("farmer")) {
      return "For agriculture funding, here are excellent options:\n\n🌾 **Government Schemes:**\n• PM Kisan Samman Nidhi\n• Agriculture Infrastructure Fund\n• State agriculture grants\n\n🏦 **Bank Loans:**\n• Kisan Credit Card\n• Agriculture term loans\n• Equipment financing\n\nWhat type of agricultural activity are you involved in?"
    }

    if (input.includes("women") || input.includes("female")) {
      return "We have special schemes for women entrepreneurs:\n\n👩‍💼 **Women-Specific Grants:**\n• Stand-Up India Scheme\n• Mahila Udyam Nidhi\n• State women entrepreneur grants\n\n🏦 **Women-Friendly Loans:**\n• HDFC Women Entrepreneur Loan\n• SBI Stree Shakti Package\n• Lower interest rates for women\n\nThese schemes often have relaxed eligibility criteria and better terms!"
    }

    if (input.includes("eligibility") || input.includes("qualify")) {
      return "Eligibility varies by scheme, but common requirements include:\n\n✅ **For Grants:**\n• Indian citizenship\n• Business registration (for business grants)\n• Age limits (usually 18-65)\n• Income criteria\n\n✅ **For Loans:**\n• Good credit score (650+)\n• Business vintage (1-3 years)\n• Income proof\n• Collateral (for larger amounts)\n\nTell me about your specific situation, and I can guide you to schemes you're eligible for!"
    }

    if (input.includes("how") || input.includes("apply")) {
      return "Here's how to apply:\n\n📝 **Application Process:**\n1. Choose the right scheme\n2. Gather required documents\n3. Fill application form\n4. Submit online/offline\n5. Track application status\n\n📄 **Common Documents:**\n• Aadhaar & PAN card\n• Business registration\n• Bank statements\n• Income proof\n• Project report\n\nI can help you find direct application links for specific schemes!"
    }

    if (input.includes("state") || input.includes("location")) {
      return "Location is important for finding the right grants! Different states offer different schemes:\n\n🗺️ **Popular State Schemes:**\n• Maharashtra: Startup policy grants\n• Karnataka: Innovation grants\n• Tamil Nadu: MSME support\n• Gujarat: Industrial promotion\n\nWhich state are you in? I'll find location-specific opportunities for you."
    }

    // Default responses
    const defaultResponses = [
      "I'd be happy to help you find the right funding! Could you tell me more about:\n• What type of business/project you have\n• Your location (state)\n• Funding amount needed\n• Whether you prefer grants or loans",
      "Let me help you navigate funding options! Are you looking for:\n• Government grants (no repayment)\n• Bank loans (with interest)\n• Startup funding\n• Agriculture support\n• Women entrepreneur schemes",
      "I can guide you to the perfect funding solution! To give you the best recommendations, please share:\n• Your business sector\n• Location\n• Funding requirements\n• Current business stage",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-dpurpose-gradient hover:opacity-90 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-80 md:w-96 shadow-2xl z-50 border-dpurpose-light transition-all duration-300 ${
        isMinimized ? "h-16" : "h-96 md:h-[500px]"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-dpurpose-gradient text-white rounded-t-lg">
        <CardTitle className="text-sm font-medium flex items-center">
          <Bot className="h-4 w-4 mr-2" />
          Dpurpose AI Assistant
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-white hover:bg-white/20"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user" ? "bg-dpurpose-light" : "bg-gray-200"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                        message.sender === "user" ? "bg-dpurpose-light text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
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
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about grants, loans, eligibility..."
                className="flex-1 border-dpurpose-light focus:border-dpurpose-dark"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-dpurpose-gradient hover:opacity-90"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
