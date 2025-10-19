import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'prospect';
  lastContact: string;
}

interface Contact {
  id: string;
  clientId: string;
  type: string;
  value: string;
  isPrimary: boolean;
}

interface HistoryItem {
  id: string;
  clientId: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  date: string;
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Анна Иванова',
    company: 'Tech Solutions',
    email: 'anna@techsolutions.ru',
    phone: '+7 (495) 123-45-67',
    status: 'active',
    lastContact: '2025-10-15'
  },
  {
    id: '2',
    name: 'Дмитрий Петров',
    company: 'Digital Agency',
    email: 'dmitry@digital.ru',
    phone: '+7 (495) 234-56-78',
    status: 'active',
    lastContact: '2025-10-18'
  },
  {
    id: '3',
    name: 'Елена Сидорова',
    company: 'Marketing Pro',
    email: 'elena@marketing.ru',
    phone: '+7 (495) 345-67-89',
    status: 'prospect',
    lastContact: '2025-10-10'
  }
];

const initialContacts: Contact[] = [
  { id: '1', clientId: '1', type: 'Email', value: 'anna@techsolutions.ru', isPrimary: true },
  { id: '2', clientId: '1', type: 'Телефон', value: '+7 (495) 123-45-67', isPrimary: false },
  { id: '3', clientId: '2', type: 'Email', value: 'dmitry@digital.ru', isPrimary: true },
  { id: '4', clientId: '2', type: 'Telegram', value: '@dmitry_digital', isPrimary: false }
];

const initialHistory: HistoryItem[] = [
  {
    id: '1',
    clientId: '1',
    type: 'meeting',
    title: 'Встреча по проекту',
    description: 'Обсудили требования к новому сайту',
    date: '2025-10-15'
  },
  {
    id: '2',
    clientId: '1',
    type: 'email',
    title: 'Отправлено коммерческое предложение',
    description: 'КП на разработку корпоративного сайта',
    date: '2025-10-12'
  },
  {
    id: '3',
    clientId: '2',
    type: 'call',
    title: 'Звонок клиента',
    description: 'Уточнение деталей по текущему проекту',
    date: '2025-10-18'
  }
];

const Index = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'inactive':
        return 'bg-slate-500/10 text-slate-700 border-slate-200';
      case 'prospect':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
    }
  };

  const getStatusLabel = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'Активный';
      case 'inactive':
        return 'Неактивный';
      case 'prospect':
        return 'Потенциальный';
    }
  };

  const getHistoryIcon = (type: HistoryItem['type']) => {
    switch (type) {
      case 'call':
        return 'Phone';
      case 'email':
        return 'Mail';
      case 'meeting':
        return 'Users';
      case 'note':
        return 'FileText';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-2">
              Клиенты
            </h1>
            <p className="text-slate-500 text-lg">
              Управление контактами и историей взаимодействий
            </p>
          </div>
          
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 shadow-sm hover:shadow-md transition-all">
                <Icon name="Plus" size={18} />
                <span className="ml-2">Добавить клиента</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Новый клиент</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Введите имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" placeholder="Название компании" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" />
                </div>
                <Button className="w-full mt-6">Сохранить</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Поиск по имени или компании..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-slate-200 shadow-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="clients" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TabsList className="bg-white border border-slate-200 p-1 mb-8 shadow-sm">
            <TabsTrigger value="clients" className="px-6 data-[state=active]:shadow-sm">
              <Icon name="Users" size={18} />
              <span className="ml-2">Клиенты</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="px-6 data-[state=active]:shadow-sm">
              <Icon name="Contact" size={18} />
              <span className="ml-2">Контакты</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="px-6 data-[state=active]:shadow-sm">
              <Icon name="Clock" size={18} />
              <span className="ml-2">История</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-4">
            {filteredClients.map((client, index) => (
              <Card
                key={client.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 bg-white/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedClient(client)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shadow-md">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">{client.name}</h3>
                        <Badge variant="outline" className={`${getStatusColor(client.status)} border`}>
                          {getStatusLabel(client.status)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3 font-medium">{client.company}</p>
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={16} className="text-slate-400" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Phone" size={16} className="text-slate-400" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-2">Последний контакт</p>
                    <p className="text-sm font-medium text-slate-600">{formatDate(client.lastContact)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {contacts.map((contact, index) => {
              const client = clients.find(c => c.id === contact.clientId);
              return (
                <Card
                  key={contact.id}
                  className="p-6 hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm shadow-md">
                        <Icon name="Contact" size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900">{client?.name}</h3>
                          {contact.isPrimary && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              Основной
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{client?.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 mb-1">{contact.type}</p>
                      <p className="text-sm font-medium text-slate-700">{contact.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent" />
              
              {history.map((item, index) => {
                const client = clients.find(c => c.id === item.clientId);
                return (
                  <div
                    key={item.id}
                    className="relative pl-16 pb-8 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute left-3 top-2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-md">
                      <Icon name={getHistoryIcon(item.type)} size={12} className="text-blue-600" />
                    </div>
                    
                    <Card className="p-5 hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-600 font-medium">{client?.name} • {client?.company}</p>
                        </div>
                        <p className="text-xs text-slate-400 whitespace-nowrap ml-4">{formatDate(item.date)}</p>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
