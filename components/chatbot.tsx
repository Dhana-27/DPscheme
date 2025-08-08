'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Bot, User, Leaf, Loader2 } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your DPurpose Foundation assistant. I can help you find grants, loans, and funding opportunities. What are you looking for today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    'Find business grants',
    'Compare bank loans',
    'State government schemes',
    'Startup funding options',
    'Agriculture loans',
    'Women entrepreneur grants'
  ]

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('grant') || message.includes('funding')) {
      return 'I can help you find grants! Based on your needs, I recommend checking our government grants section. You can filter by state, category, and provider type. Would you like me to show you grants for a specific state or category?'
    }
    
    if (message.includes('loan') || message.includes('bank')) {
      return 'For loans, we have options from both public and private banks. You can compare interest rates, processing times, and eligibility criteria. What type of loan are you interested in - business, personal, or something specific?'
    }
    
    if (message.includes('business') || message.includes('startup')) {
      return 'Great! For business funding, I recommend looking at:\n\n• PM Mudra Yojana (up to ₹10 lakhs)\n• State startup grants\n• Business loans from banks\n• SME funding schemes\n\nWould you like me to help you find options in your state?'
    }
    
    if (message.includes('agriculture') || message.includes('farming')) {
      return 'For agriculture funding, there are several excellent options:\n\n• Kisan Credit Card schemes\n• Agriculture infrastructure grants\n• Crop loan subsidies\n• Farm equipment financing\n\nWhich state are you farming in? I can show you state-specific schemes.'
    }
    
    if (message.includes('women') || message.includes('female')) {
      return 'We have dedicated schemes for women entrepreneurs:\n\n• Women Self Help Group loans\n• Mahila Udyam Nidhi schemes\n• State women empowerment grants\n• Priority sector lending for women\n\nThese often have lower interest rates and easier eligibility criteria!'
    }
    
    return 'I understand you\'re looking for funding opportunities. I can help you with:\n\n• Government grants (central & state)\n• Bank loans (public & private)\n• Specific sector funding\n• Eligibility requirements\n\nCould you tell me more about what type of funding you need and which state you\'re in?'
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-dpurpose-dark/20">
      <CardHeader className="bg-dpurpose-dark text-white rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">DPurpose Assistant</CardTitle>
            <p className="text-xs text-green-100">Online • Ready to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-dpurpose-dark text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot className="w-4 h-4 mt-0.5 text-dpurpose-dark" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <User className="w-4 h-4 mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
              <Bot className="w-4 h-4 text-dpurpose-dark" />
              <Loader2 className="w-4 h-4 animate-spin text-dpurpose-dark" />
              <span className="text-sm text-gray-600">Typing...</span>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 text-center">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-dpurpose-dark hover:text-white border-dpurpose-dark text-dpurpose-dark text-xs"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about grants, loans, or funding..."
            className="flex-1 focus:border-dpurpose-dark focus:ring-dpurpose-dark"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputMessage)
              }
            }}
          />
          <Button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
