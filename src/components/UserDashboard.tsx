"use client";
import React, { useState } from 'react';

import { 
  User, 
  Bell, 
  FileText, 
  Send, 
  Settings,
  LogOut,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'student' | 'parent';
  name: string;
}

interface UserDashboardProps {
  user: User;

}

const UserDashboard = ({ user }: UserDashboardProps) => {
  return (
    <>
      
    </>
  )
};

export default UserDashboard;