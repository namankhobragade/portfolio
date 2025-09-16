
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Smartphone, HardDrive, Cpu, ScreenShare, Wifi, Info, Loader2, Network, Gauge, Shield, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';

interface ClientInfoState {
  ip?: string;
  geolocation?: any;
  userAgent?: string;
  platform?: string;
  language?: string;
  cpuCores?: number;
  memory?: number;
  screen?: { width: number; height: number; colorDepth: number; pixelRatio: number };
  battery?: { level: number; charging: boolean };
  touch?: boolean;
  gpu?: { vendor: string; renderer: string };
  connection?: { type: string; effectiveType: string; downlink?: number; rtt?: number; saveData?: boolean; };
  mediaDevices?: { audio: number; video: number; others: number };
  online?: boolean;
  doNotTrack?: string;
  plugins?: string[];
  performance?: PerformanceNavigationTiming;
}

const InfoItem = ({ label, value, unit = '' }: { label: string; value: any; unit?: string }) => {
    if (value === undefined || value === null || value === '') return null;
    return (
        <div className="border p-3 rounded-lg flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-right break-all">{String(value)} {unit}</span>
        </div>
    );
};

export function ClientInfoWidget() {
  const [info, setInfo] = useState<ClientInfoState>({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const getClientInfo = async () => {
      setLoading(true);
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        
        const state: ClientInfoState = {
            ip: geoData.ip,
            geolocation: {
                city: geoData.city,
                region: geoData.region,
                country: geoData.country_name,
                lat: geoData.latitude,
                lon: geoData.longitude,
                tz: geoData.timezone,
                isp: geoData.org,
            },
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cpuCores: navigator.hardwareConcurrency,
            // @ts-ignore
            memory: navigator.deviceMemory,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio,
            },
            touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            online: navigator.onLine,
            // @ts-ignore
            doNotTrack: navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack,
            plugins: Array.from(navigator.plugins).map(p => p.name),
            performance: performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming,
        };

        try {
            // @ts-ignore
            const battery = await navigator.getBattery();
            state.battery = {
                level: Math.round(battery.level * 100),
                charging: battery.charging,
            };
        } catch (e) { console.warn('Battery API not supported'); }

        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                // @ts-ignore
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                state.gpu = {
                    // @ts-ignore
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    // @ts-ignore
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                };
            }
        } catch (e) { console.warn('WebGL not supported'); }
        
        // @ts-ignore
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            state.connection = {
                type: connection.type,
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData,
            };
        }

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            state.mediaDevices = {
                audio: devices.filter(d => d.kind === 'audioinput').length,
                video: devices.filter(d => d.kind === 'videoinput').length,
                others: devices.filter(d => d.kind !== 'audioinput' && d.kind !== 'videoinput').length,
            };
        } catch(e) { console.warn("Media device enumeration not supported"); }

        setInfo(state);
      } catch (error) {
        console.error("Failed to gather client info:", error);
      } finally {
        setLoading(false);
      }
    };

    getClientInfo();
  }, [isOpen]);
  
  const perf = info.performance;

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-48"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Geolocation</CardTitle>
                    <HardDrive className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <InfoItem label='IP Address' value={info.ip} />
                    <InfoItem label='City' value={info.geolocation?.city} />
                    <InfoItem label='Region' value={info.geolocation?.region} />
                    <InfoItem label='Country' value={info.geolocation?.country} />
                    <InfoItem label='Timezone' value={info.geolocation?.tz} />
                    <InfoItem label='ISP' value={info.geolocation?.isp} />
                </CardContent>
            </Card>

            <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Device Hardware</CardTitle>
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <InfoItem label='OS/Platform' value={info.platform} />
                    <InfoItem label='CPU Cores' value={info.cpuCores} />
                    <InfoItem label='Device Memory (GB)' value={info.memory} />
                    <InfoItem label='Touch Enabled' value={info.touch ? 'Yes' : 'No'} />
                    {info.battery && <InfoItem label='Battery' value={`${info.battery.level}% ${info.battery.charging ? '(Charging)' : ''}`} />}
                </CardContent>
            </Card>
            
            <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Network</CardTitle>
                    <Wifi className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <InfoItem label='Online' value={info.online ? 'Yes' : 'No'} />
                    <InfoItem label='Connection Type' value={info.connection?.type} />
                    <InfoItem label='Effective Type' value={info.connection?.effectiveType} />
                    <InfoItem label='Est. Speed' value={info.connection?.downlink} unit='Mbps' />
                    <InfoItem label='Est. RTT' value={info.connection?.rtt} unit='ms' />
                    <InfoItem label='Data Saver' value={info.connection?.saveData ? 'On' : 'Off'} />
                </CardContent>
            </Card>

             <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Display & GPU</CardTitle>
                    <ScreenShare className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <InfoItem label='Resolution' value={`${info.screen?.width}x${info.screen?.height}`} />
                    <InfoItem label='Pixel Ratio' value={info.screen?.pixelRatio} />
                    <InfoItem label='Color Depth' value={`${info.screen?.colorDepth}-bit`} />
                    <InfoItem label='GPU Vendor' value={info.gpu?.vendor} />
                    <InfoItem label='GPU Renderer' value={info.gpu?.renderer} />
                </CardContent>
            </Card>

            <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Performance</CardTitle>
                    <Gauge className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    {perf && <InfoItem label='Page Load' value={(perf.duration / 1000).toFixed(2)} unit='s' />}
                    {perf && <InfoItem label='Time to First Byte' value={(perf.responseStart - perf.requestStart).toFixed(0)} unit='ms' />}
                    {perf && <InfoItem label='DOM Interactive' value={perf.domInteractive.toFixed(0)} unit='ms' />}
                    {perf && <InfoItem label='DOM Complete' value={perf.domComplete.toFixed(0)} unit='ms' />}
                </CardContent>
            </Card>

            <Card className="bg-transparent border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Browser & Privacy</CardTitle>
                    <Settings className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <InfoItem label='Language' value={info.language} />
                    <InfoItem label='Do Not Track' value={info.doNotTrack} />
                    <InfoItem label='Microphones' value={info.mediaDevices?.audio} />
                    <InfoItem label='Cameras' value={info.mediaDevices?.video} />
                    <InfoItem label='User Agent' value={info.userAgent} />
                    {info.plugins && info.plugins.length > 0 && <InfoItem label='Plugins' value={info.plugins.join(', ')} />}
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
            variant="outline"
            size="icon"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 rounded-full shadow-lg"
        >
          <Info className="h-6 w-6" />
          <span className="sr-only">View Visitor Stats</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Live Visitor Stats</DialogTitle>
          <DialogDescription>
            A real-time snapshot of your browser, device, and network information gathered using client-side JavaScript APIs.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
            {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

    