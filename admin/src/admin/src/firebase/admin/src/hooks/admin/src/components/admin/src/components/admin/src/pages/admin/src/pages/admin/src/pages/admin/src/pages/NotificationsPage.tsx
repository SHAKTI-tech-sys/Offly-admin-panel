import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { SystemNotification } from '../types';
import { Bell, Send, Trash2, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'system_notifications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SystemNotification[];
      setNotifications(list);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'system_notifications'), {
        title: title.trim() || 'System Announcement',
        message: message.trim(),
        createdAt: serverTimestamp(),
        active: true
      });
      setTitle(''); setMessage('');
      alert('Broadcast sent!');
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* UI implementation omitted for brevity */}
    </div>
  );
};

export default NotificationsPage;
