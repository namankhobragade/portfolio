
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

type Visitor = {
    id: number;
    created_at: string;
    user_agent?: string;
    platform?: string;
    language?: string;
    ip?: string;
    geolocation?: any;
    connection_type?: string;
    cpu_cores?: number;
    memory?: number;
    screen_resolution?: string;
    is_touch_enabled?: boolean;
    gpu?: string;
    network_info?: any;
    is_online?: boolean;
    do_not_track?: string;
    performance?: any;
};

const InfoItem = ({ label, value }: { label: string; value: any }) => {
    if (value === undefined || value === null || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) return null;
    let displayValue = String(value);
    if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
    } else if (typeof value === 'object') {
        // Pretty print the object for readability in the modal
        displayValue = JSON.stringify(value, null, 2);
    }
    return (
        <div className="flex justify-between items-start text-sm py-2 border-b">
            <span className="text-muted-foreground font-medium whitespace-nowrap pr-4">{label}</span>
            <pre className="text-right break-words whitespace-pre-wrap font-sans">{displayValue}</pre>
        </div>
    );
};


export default function VisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

    useEffect(() => {
        const fetchVisitors = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('visitors')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) {
                setError(`Failed to fetch visitor data: ${error.message}`);
                console.error("Error fetching visitors:", error);
            } else {
                setVisitors(data as Visitor[]);
            }

            setLoading(false);
        };

        fetchVisitors();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM d, yyyy, h:mm:ss a");
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
        <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedVisitor(null)}>
            <Card className="bg-transparent border">
                <CardHeader>
                    <CardTitle>Visitor Logs</CardTitle>
                    <CardDescription>A log of the last 100 visits to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    {visitors.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No visitor data recorded yet.</p>
                    ) : (
                        <div className="rounded-md border mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Platform</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead>User Agent</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {visitors.map(visitor => (
                                        <TableRow key={visitor.id}>
                                            <TableCell>{formatDate(visitor.created_at)}</TableCell>
                                            <TableCell>{`${visitor.geolocation?.city || 'N/A'}, ${visitor.geolocation?.country_name || 'N/A'}`}</TableCell>
                                            <TableCell>{visitor.platform}</TableCell>
                                            <TableCell>{visitor.ip}</TableCell>
                                            <TableCell className="max-w-xs truncate">{visitor.user_agent}</TableCell>
                                            <TableCell className="text-right">
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedVisitor(visitor)}>
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">View Details</span>
                                                    </Button>
                                                </DialogTrigger>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Visitor Details</DialogTitle>
                    {selectedVisitor && (
                        <DialogDescription>
                            Full details for the visit on {formatDate(selectedVisitor.created_at)}.
                        </DialogDescription>
                    )}
                </DialogHeader>
                {selectedVisitor && (
                    <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-2">
                        <InfoItem label="Timestamp" value={selectedVisitor.created_at} />
                        <InfoItem label="IP Address" value={selectedVisitor.ip} />
                        <InfoItem label="City" value={selectedVisitor.geolocation?.city} />
                        <InfoItem label="Region" value={selectedVisitor.geolocation?.region} />
                        <InfoItem label="Country" value={selectedVisitor.geolocation?.country_name} />
                        <InfoItem label="Latitude" value={selectedVisitor.geolocation?.latitude} />
                        <InfoItem label="Longitude" value={selectedVisitor.geolocation?.longitude} />
                        <InfoItem label="Timezone" value={selectedVisitor.geolocation?.timezone} />
                        <InfoItem label="ISP" value={selectedVisitor.geolocation?.org} />
                        <InfoItem label="Platform" value={selectedVisitor.platform} />
                        <InfoItem label="Language" value={selectedVisitor.language} />
                        <InfoItem label="Connection Type" value={selectedVisitor.connection_type} />
                        <InfoItem label="Network Info" value={selectedVisitor.network_info} />
                        <InfoItem label="CPU Cores" value={selectedVisitor.cpu_cores} />
                        <InfoItem label="Memory (GB)" value={selectedVisitor.memory} />
                        <InfoItem label="Screen Resolution" value={selectedVisitor.screen_resolution} />
                        <InfoItem label="Touch Enabled" value={selectedVisitor.is_touch_enabled} />
                        <InfoItem label="GPU" value={selectedVisitor.gpu} />
                        <InfoItem label="Is Online" value={selectedVisitor.is_online} />
                        <InfoItem label="Do Not Track" value={selectedVisitor.do_not_track} />
                        <InfoItem label="Page Performance" value={selectedVisitor.performance} />
                        <InfoItem label="User Agent" value={selectedVisitor.user_agent} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
