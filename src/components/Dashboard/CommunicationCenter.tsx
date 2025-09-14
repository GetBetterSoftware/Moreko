"use client";
import React, { useState } from 'react';

import { 
  Send, 
  Users, 
  Mail, 
  MessageSquare, 
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';


const CommunicationCenter = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [message, setMessage] = useState({
    type: 'sms',
    subject: '',
    content: '',
    recipients: 'all'
  });

  // Mock subscriber data
  const subscribers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+27812345678', type: 'parent', subscriptions: ['sms', 'email'] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+27823456789', type: 'student', subscriptions: ['email'] },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+27834567890', type: 'parent', subscriptions: ['sms'] },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+27845678901', type: 'student', subscriptions: ['sms', 'email'] }
  ];

  const [messageHistory] = useState([
    {
      id: '1',
      type: 'email',
      subject: 'Parent-Teacher Meeting Notice',
      content: 'Dear Parents, please note that parent-teacher meetings are scheduled for next week.',
      sentAt: '2024-01-20 10:30',
      recipients: 25,
      status: 'sent'
    },
    {
      id: '2', 
      type: 'sms',
      subject: 'Exam Schedule',
      content: 'Grade 12 final exams start Monday 8AM. Check your timetable.',
      sentAt: '2024-01-19 14:15',
      recipients: 45,
      status: 'sent'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', message);
    alert(`${message.type.toUpperCase()} sent successfully!`);
    setMessage({ type: 'sms', subject: '', content: '', recipients: 'all' });
  };

  const renderComposeTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendMessage} className="space-y-6">
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="default"
              onClick={() => setMessage({...message, type: 'sms'})}
              className={message.type === 'sms' ? 'flex-1 bg-red-800 text-white' : 'flex-1 bg-white shadow-sm cursor-pointer'}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              SMS
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => setMessage({...message, type: 'email'})}
              className={message.type === 'email' ? 'flex-1 bg-red-800 text-white' : 'flex-1 bg-white shadow-sm cursor-pointer'}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Send to</Label>
            <select
              id="recipients"
             className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800"
              value={message.recipients}
              onChange={(e) => setMessage({...message, recipients: e.target.value})}
            >
              <option value="all">All Subscribers</option>
              <option value="parents">Parents Only</option>
              <option value="students">Students Only</option>
            </select>
          </div>

          {message.type === 'email' && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <input
                id="subject"
                className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Enter email subject"
                value={message.subject}
                onChange={(e) => setMessage({...message, subject: e.target.value})}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <textarea
              id="content"
              rows={6}
              className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800"
              placeholder={message.type === 'sms' ? 'Enter SMS message (160 chars max)' : 'Enter email content'}
              value={message.content}
              onChange={(e) => setMessage({...message, content: e.target.value})}
              maxLength={message.type === 'sms' ? 160 : undefined}
              required
            />
            {message.type === 'sms' && (
              <p className="text-sm text-gray-500">
                {message.content.length}/160 characters
              </p>
            )}
          </div>

          <Button type="submit" className="w-full bg-red-800 text-white hover:bg-red-900">
            <Send className="w-4 h-4 mr-2" />
            Send {message.type.toUpperCase()}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderSubscribersTab = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Subscribers ({subscribers.length})</span>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{subscriber.name}</h3>
                <p className="text-sm text-gray-600">{subscriber.email}</p>
                <p className="text-sm text-gray-600">{subscriber.phone}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${
                    subscriber.type === 'parent' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {subscriber.type}
                  </span>
                  {subscriber.subscriptions.map((sub) => (
                    <span key={sub} className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderHistoryTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Message History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messageHistory.map((msg) => (
            <div key={msg.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {msg.type === 'email' ? (
                    <Mail className="w-4 h-4 text-blue-600" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  )}
                  <h3 className="font-medium">{msg.subject || 'SMS Message'}</h3>
                </div>
                <span className="text-sm text-gray-500">{msg.sentAt}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{msg.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Sent to {msg.recipients} recipients
                </span>
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'subscribers':
        return renderSubscribersTab();
      case 'history':
        return renderHistoryTab();
      default:
        return renderComposeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-red-800" />
          <span className="text-sm text-gray-600">{subscribers.length} total subscribers</span>
        </div>
      </div>

      <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'compose' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('compose')}
          className="flex-1"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </Button>
        <Button
          variant={activeTab === 'subscribers' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('subscribers')}
          className="flex-1"
        >
          <Users className="w-4 h-4 mr-2" />
          Subscribers
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('history')}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-2" />
          History
        </Button>
      </nav>

      {renderContent()}
    </div>
  );
};

export default CommunicationCenter;
