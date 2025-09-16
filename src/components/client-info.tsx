
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Smartphone, HardDrive, Cpu, ScreenShare, BatteryCharging, Wifi, Mic, Video } from 'lucide-react';

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
  connection?: { type: string; effectiveType: string };
  mediaDevices?: { audio: number; video: number; others: number };
}

export function ClientInfo() {
  const [info, setInfo] = useState<ClientInfoState>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientInfo = async () => {
      try {
        // --- IP & Geolocation ---
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
        };

        // --- Battery ---
        try {
            // @ts-ignore
            const battery = await navigator.getBattery();
            state.battery = {
                level: Math.round(battery.level * 100),
                charging: battery.charging,
            };
        } catch (e) { console.warn('Battery API not supported'); }

        // --- GPU ---
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
        
        // --- Network ---
        // @ts-ignore
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            state.connection = {
                type: connection.type,
                effectiveType: connection.effectiveType,
            };
        }

        // --- Media Devices ---
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
  }, []);

  const renderInfo = (label: string, value: any) => {
      if(value === undefined || value === null) return null;
      return <li className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span> <span className="font-medium text-right">{String(value)}</span></li>
  }
  
  if (loading) {
      return (
          <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container text-center">
                  <p>Loading client information...</p>
              </div>
          </section>
      )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Live Visitor Stats</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A real-time snapshot of your browser, device, and network information gathered using client-side JavaScript APIs.
            </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Geolocation</CardTitle>
                    <HardDrive className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <ul className="space-y-1">
                        {renderInfo('IP Address', info.ip)}
                        {renderInfo('City', info.geolocation?.city)}
                        {renderInfo('Region', info.geolocation?.region)}
                        {renderInfo('Country', info.geolocation?.country)}
                        {renderInfo('Timezone', info.geolocation?.tz)}
                        {renderInfo('ISP', info.geolocation?.isp)}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Device</CardTitle>
                    <Smartphone className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {renderInfo('OS/Platform', info.platform)}
                        {renderInfo('Language', info.language)}
                        {renderInfo('CPU Cores', info.cpuCores)}
                        {renderInfo('Device Memory (GB)', info.memory)}
                        {renderInfo('Touch Enabled', info.touch ? 'Yes' : 'No')}
                        {info.userAgent && <li className="text-xs text-muted-foreground pt-2">{info.userAgent}</li>}
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Display</CardTitle>
                    <ScreenShare className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {renderInfo('Resolution', `${info.screen?.width}x${info.screen?.height}`)}
                        {renderInfo('Color Depth', `${info.screen?.colorDepth}-bit`)}
                        {renderInfo('Pixel Ratio', info.screen?.pixelRatio)}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">GPU</CardTitle>
                    <Cpu className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {renderInfo('Vendor', info.gpu?.vendor)}
                        {renderInfo('Renderer', info.gpu?.renderer)}
                    </ul>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Connectivity</CardTitle>
                    <Wifi className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {renderInfo('Connection Type', info.connection?.type)}
                        {renderInfo('Effective Type', info.connection?.effectiveType)}
                         {info.battery && renderInfo('Battery', `${info.battery.level}% ${info.battery.charging ? '(Charging)' : ''}`)}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Media Devices</CardTitle>
                    <Mic className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {renderInfo('Microphones', info.mediaDevices?.audio)}
                        {renderInfo('Cameras', info.mediaDevices?.video)}
                        {renderInfo('Other Devices', info.mediaDevices?.others)}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
