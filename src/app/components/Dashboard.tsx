"use client";
import { useState } from 'react';


import { 
  MessageSquare, 
  Users, 
  Send, 
  History, 
  LogOut, 
  FileText,
  Plus,
  Filter
} from 'lucide-react';
import ContactManager from './ContactManager';
import SMSComposer from './SMSComposer';
import MessageHistory from './MessageHistory';
import TemplateManager from './TemplateManager';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  onLogout: () => void;
}

interface MessageRecord {
  id: string;
  content: string;
  recipients: string;
  timestamp: string;
  status: 'sent' | 'failed' | 'pending';
}

const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [contacts] = useState([
    {
      id: '1',
      studentName: 'Thabo Molefe',
      grade: '10A',
      guardianName: 'Maria Molefe',
      phoneNumber: '+27821234567'
    },
    {
      id: '2',
      studentName: 'Nomsa Khumalo',
      grade: '11B',
      guardianName: 'John Khumalo',
      phoneNumber: '+27829876543'
    },
    {
      id: '3',
      studentName: 'Sipho Mthembu',
      grade: '9C',
      guardianName: 'Grace Mthembu',
      phoneNumber: '+27835551234'
    }
  ]);

  const [messageHistory] = useState<MessageRecord[]>([
    {
      id: '1',
      content: 'Parent-teacher meeting scheduled for Friday, 3 PM in the school hall.',
      recipients: 'All parents (Grade 10)',
      timestamp: '2024-01-15 14:30',
      status: 'sent'
    },
    {
      id: '2',
      content: 'School will be closed tomorrow due to weather conditions.',
      recipients: 'All parents',
      timestamp: '2024-01-14 08:15',
      status: 'sent'
    }
  ]);

  const renderContent = () => {
    switch (activeView) {
      case 'contacts':
        return <ContactManager contacts={contacts} />;
      case 'compose':
        return <SMSComposer contacts={contacts} />;
      case 'history':
        return <MessageHistory history={messageHistory} />;
      case 'templates':
        return <TemplateManager />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('contacts')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contacts.length}</div>
                <p className="text-xs text-muted-foreground">Parent/Guardian contacts</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('compose')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Send Message</CardTitle>
                <Send className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Compose</div>
                <p className="text-xs text-muted-foreground">Create and send SMS</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('history')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <History className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messageHistory.length}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('templates')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Templates</CardTitle>
                <FileText className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Message templates</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Moreko High School</h1>
                <p className="text-sm text-gray-500">SMS Admin Portal</p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="flex space-x-4 mb-8">
          <Button
            variant={activeView === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Dashboard</span>
          </Button>
          <Button
            variant={activeView === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveView('contacts')}
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Contacts</span>
          </Button>
          <Button
            variant={activeView === 'compose' ? 'default' : 'outline'}
            onClick={() => setActiveView('compose')}
            className="flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Compose SMS</span>
          </Button>
          <Button
            variant={activeView === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveView('history')}
            className="flex items-center space-x-2"
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </Button>
          <Button
            variant={activeView === 'templates' ? 'default' : 'outline'}
            onClick={() => setActiveView('templates')}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Templates</span>
          </Button>
        </nav>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
