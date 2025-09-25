
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

type Contact = { id: number; name: string; email: string; message: string; created_at: string; };
type Subscriber = { id: number; email: string; created_at: string; };
type ResumeDownload = { id: number; name: string; email: string; purpose: string; created_at: string; };

const MailLink = ({ email }: { email: string }) => (
    <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
        <Mail className="h-4 w-4" />
        {email}
    </a>
);

export default function SubmissionsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [resumeDownloads, setResumeDownloads] = useState<ResumeDownload[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            setError(null);

            const [contactsRes, subscribersRes, resumeDownloadsRes] = await Promise.all([
                supabase.from('contacts').select('*').order('created_at', { ascending: false }),
                supabase.from('subscribers').select('*').order('created_at', { ascending: false }),
                supabase.from('resume_downloads').select('*').order('created_at', { ascending: false }),
            ]);

            if (contactsRes.error || subscribersRes.error || resumeDownloadsRes.error) {
                const errorMessage = contactsRes.error?.message || subscribersRes.error?.message || resumeDownloadsRes.error?.message;
                setError(`Failed to fetch submissions: ${errorMessage}`);
                console.error("Error fetching submissions:", {
                    contactsError: contactsRes.error,
                    subscribersError: subscribersRes.error,
                    resumeDownloadsError: resumeDownloadsRes.error
                });
            } else {
                setContacts(contactsRes.data as Contact[]);
                setSubscribers(subscribersRes.data as Subscriber[]);
                setResumeDownloads(resumeDownloadsRes.data as ResumeDownload[]);
            }

            setLoading(false);
        };

        fetchSubmissions();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
        } catch (e) {
            return dateString;
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    if (error) {
        return <div className="text-destructive">{error}</div>;
    }

    return (
        <Card className="bg-transparent border">
            <CardHeader>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>View all data submitted through your portfolio's forms.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="contacts">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
                        <TabsTrigger value="resume">Resume Downloads ({resumeDownloads.length})</TabsTrigger>
                        <TabsTrigger value="newsletter">Newsletter ({subscribers.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="contacts">
                        <DataTable 
                            headers={['Name', 'Email', 'Message', 'Date']} 
                            data={contacts.map(c => [c.name, <MailLink key={c.id} email={c.email} />, c.message, formatDate(c.created_at)])} 
                        />
                    </TabsContent>
                    <TabsContent value="resume">
                        <DataTable 
                            headers={['Name', 'Email', 'Purpose', 'Date']} 
                            data={resumeDownloads.map(r => [r.name, <MailLink key={r.id} email={r.email} />, r.purpose, formatDate(r.created_at)])} 
                        />
                    </TabsContent>
                    <TabsContent value="newsletter">
                        <DataTable 
                            headers={['Email', 'Date']} 
                            data={subscribers.map(s => [<MailLink key={s.id} email={s.email} />, formatDate(s.created_at)])} 
                        />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function DataTable({ headers, data }: { headers: string[], data: (React.ReactNode)[][] }) {
    if (data.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No submissions yet.</p>;
    }
    return (
        <div className="rounded-md border mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
