import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Lock, 
  Play, 
  Square, 
  X, 
  Plus, 
  Globe, 
  Sun, 
  Moon,
  SlidersHorizontal
} from 'lucide-react';

const DEVICES = ['Desktop', 'Mobile', 'Tablet'];
const BROWSERS = ['Chrome', 'Firefox', 'Safari', 'Edge'];
const OPERATING_SYSTEMS = ['Windows', 'macOS', 'Linux', 'Android', 'iOS'];

const COUNTRIES = [
  { code: 'US', name: 'United States', locale: 'en-US', tz: 'America/New_York' },
  { code: 'GB', name: 'United Kingdom', locale: 'en-GB', tz: 'Europe/London' },
  { code: 'CA', name: 'Canada', locale: 'en-CA', tz: 'America/Toronto' },
  { code: 'DE', name: 'Germany', locale: 'de-DE', tz: 'Europe/Berlin' },
  { code: 'FR', name: 'France', locale: 'fr-FR', tz: 'Europe/Paris' },
  { code: 'IN', name: 'India', locale: 'en-IN', tz: 'Asia/Kolkata' },
  { code: 'JP', name: 'Japan', locale: 'ja-JP', tz: 'Asia/Tokyo' },
  { code: 'AU', name: 'Australia', locale: 'en-AU', tz: 'Australia/Sydney' },
];

const LOCALES = [
  'en-US',
  'en-GB',
  'en-CA',
  'de-DE',
  'fr-FR',
  'hi-IN',
  'ja-JP',
  'es-ES',
  'pt-BR',
];

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Australia/Sydney',
  'UTC',
];

function getStandardUserAgent(browser, os, device) {
  if (device === 'Mobile') {
    if (os === 'iOS') {
      return 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1';
    }
    return 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36';
  }
  if (device === 'Tablet') {
    if (os === 'iOS') {
      return 'Mozilla/5.0 (iPad; CPU OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1';
    }
    return 'Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';
  }
  if (browser === 'Firefox') {
    return os === 'macOS'
      ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:135.0) Gecko/20100101 Firefox/135.0'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0';
  }
  if (browser === 'Safari') {
    return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15';
  }
  if (browser === 'Edge') {
    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0';
  }
  return os === 'macOS'
    ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
    : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';
}

export default function App() {
  // Day / Night Theme (true = dark, false = light)
  const [isDark, setIsDark] = useState(true);

  // Input URL
  const [urlInput, setUrlInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Configuration Fields
  const [device, setDevice] = useState('Desktop');
  const [browser, setBrowser] = useState('Chrome');
  const [os, setOs] = useState('Windows');
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [country, setCountry] = useState('US');
  const [locale, setLocale] = useState('en-US');
  const [timezone, setTimezone] = useState('America/New_York');
  const [ipAddress, setIpAddress] = useState('');
  const [userAgent, setUserAgent] = useState(getStandardUserAgent('Chrome', 'Windows', 'Desktop'));

  // Toggle User-Agent field
  const [showUaRow, setShowUaRow] = useState(false);

  const handleDeviceChange = (newDevice) => {
    setDevice(newDevice);
    let newWidth = 1920;
    let newHeight = 1080;
    let newOs = os;

    if (newDevice === 'Mobile') {
      newWidth = 390;
      newHeight = 844;
      if (newOs !== 'iOS' && newOs !== 'Android') newOs = 'Android';
    } else if (newDevice === 'Tablet') {
      newWidth = 768;
      newHeight = 1024;
      if (newOs !== 'iOS' && newOs !== 'Android') newOs = 'iOS';
    } else {
      newWidth = 1920;
      newHeight = 1080;
      if (newOs === 'iOS' || newOs === 'Android') newOs = 'Windows';
    }

    setWidth(newWidth);
    setHeight(newHeight);
    setOs(newOs);
    setUserAgent(getStandardUserAgent(browser, newOs, newDevice));
  };

  const handleBrowserChange = (newBrowser) => {
    setBrowser(newBrowser);
    setUserAgent(getStandardUserAgent(newBrowser, os, device));
  };

  const handleOsChange = (newOs) => {
    setOs(newOs);
    let newDevice = device;
    if (newOs === 'iOS' || newOs === 'Android') {
      if (newDevice === 'Desktop') newDevice = 'Mobile';
    } else {
      if (newDevice !== 'Desktop') newDevice = 'Desktop';
    }
    setDevice(newDevice);
    setUserAgent(getStandardUserAgent(browser, newOs, newDevice));
  };

  const handleCountryChange = (cCode) => {
    setCountry(cCode);
    const found = COUNTRIES.find((c) => c.code === cCode);
    if (found) {
      setLocale(found.locale);
      setTimezone(found.tz);
    }
  };

  const handleOpenUrl = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;

    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
      setUrlInput(target);
    }
    setActiveUrl(target);
    setIsOpen(true);
  };

  const handleDiscontinue = () => {
    setIsOpen(false);
    setActiveUrl('');
  };

  const getTabTitle = () => {
    if (activeUrl) {
      try {
        return new URL(activeUrl).hostname;
      } catch {
        return 'Web Page';
      }
    }
    if (urlInput) {
      try {
        return new URL(urlInput.startsWith('http') ? urlInput : 'https://' + urlInput).hostname;
      } catch {
        return 'New Tab';
      }
    }
    return 'New Tab';
  };

  return (
    <div className={`h-screen w-screen flex flex-col font-sans select-none overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'
    }`}>
      {/* ========================================================
          1. TOP WINDOW BAR (TABS, WINDOW CONTROLS, DAY/NIGHT TOGGLE)
          ======================================================== */}
      <div className={`px-3 pt-2 pb-0 flex items-center justify-between border-b shrink-0 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-600'
      }`}>
        <div className="flex items-center gap-3">
          {/* Traffic Light Window Dots */}
          <div className="flex items-center gap-1.5 pr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs cursor-pointer" />
          </div>

          {/* Active Browser Tab */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-t-lg text-xs font-semibold shadow-xs border-t border-x max-w-xs truncate ${
            isDark 
              ? 'bg-slate-800 text-slate-100 border-slate-700' 
              : 'bg-white text-slate-800 border-slate-300'
          }`}>
            <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{getTabTitle()}</span>
            {isOpen && (
              <button
                type="button"
                onClick={handleDiscontinue}
                title="Close"
                className={`p-0.5 rounded ml-1 ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleDiscontinue}
            title="New Tab"
            className={`p-1 rounded transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-300 text-slate-500'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Day / Night Mode (Dark / Light) Toggle Button */}
        <div className="flex items-center gap-2 pb-1">
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-400'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-indigo-600 shadow-xs'
            }`}
            title={isDark ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[11px] text-slate-200">Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[11px] text-slate-700">Night Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          2. NAVIGATION & URL ADDRESS BAR
          ======================================================== */}
      <div className={`px-3 py-2 flex items-center gap-2.5 shrink-0 border-b shadow-xs ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
      }`}>
        {/* Nav arrows & reload */}
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" disabled className={`p-1.5 rounded disabled:opacity-30 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button type="button" disabled className={`p-1.5 rounded disabled:opacity-30 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            onClick={() => {
              if (isOpen && activeUrl) {
                const cur = activeUrl;
                setActiveUrl('');
                setTimeout(() => setActiveUrl(cur), 50);
              }
            }} 
            title="Reload" 
            className={`p-1.5 rounded transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleOpenUrl} className="flex-1 flex items-center gap-2">
          <div className={`flex-1 flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-inner transition-all ${
            isDark 
              ? 'bg-slate-950 border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-900/40 text-slate-100' 
              : 'bg-white border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 text-slate-900'
          }`}>
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL to test (e.g. https://example.com)..."
              className="w-full text-xs font-mono bg-transparent focus:outline-none placeholder:font-sans placeholder:opacity-50"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="opacity-40 hover:opacity-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Open URL Button */}
          <button
            type="submit"
            disabled={!urlInput.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Open URL
          </button>

          {/* Discontinue Button */}
          <button
            type="button"
            onClick={handleDiscontinue}
            disabled={!isOpen}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            Discontinue
          </button>
        </form>

        {/* User-Agent toggle */}
        <button
          type="button"
          onClick={() => setShowUaRow((prev) => !prev)}
          className={`p-2 rounded-lg border transition-colors shrink-0 ${
            showUaRow 
              ? isDark ? 'bg-indigo-950 border-indigo-500 text-indigo-400' : 'bg-indigo-50 border-indigo-300 text-indigo-700'
              : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
          }`}
          title="Toggle User-Agent input"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================
          3. COMPACT INPUTS & DROPDOWNS ROW
          ======================================================== */}
      <div className={`px-3 py-2 text-xs shrink-0 border-b ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">Device:</span>
            <select
              value={device}
              onChange={(e) => handleDeviceChange(e.target.value)}
              className={`bg-transparent font-medium text-xs focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {DEVICES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Browser Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">Browser:</span>
            <select
              value={browser}
              onChange={(e) => handleBrowserChange(e.target.value)}
              className={`bg-transparent font-medium text-xs focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {BROWSERS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* OS Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">OS:</span>
            <select
              value={os}
              onChange={(e) => handleOsChange(e.target.value)}
              className={`bg-transparent font-medium text-xs focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {OPERATING_SYSTEMS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Resolution Inputs */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">Res:</span>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10) || 1920)}
              className="w-14 text-center font-mono text-xs focus:outline-none bg-transparent"
              placeholder="W"
            />
            <span className="opacity-40 font-bold">×</span>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10) || 1080)}
              className="w-14 text-center font-mono text-xs focus:outline-none bg-transparent"
              placeholder="H"
            />
          </div>

          {/* Country Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">Country:</span>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className={`bg-transparent font-medium text-xs focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>

          {/* Locale Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">Locale:</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className={`bg-transparent font-mono text-xs focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Timezone Dropdown */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">TZ:</span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`bg-transparent font-mono text-xs focus:outline-none cursor-pointer max-w-[130px] truncate ${
                isDark ? 'text-slate-100 [&>option]:bg-slate-900' : 'text-slate-800 [&>option]:bg-white'
              }`}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          {/* IP Address Input */}
          <div className={`flex items-center gap-1 border rounded-md px-2 py-1 shadow-xs ${
            isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <span className="text-[11px] font-semibold opacity-60">IP:</span>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Authorized IP (Default)"
              className="w-36 font-mono text-xs bg-transparent focus:outline-none placeholder:opacity-40"
            />
          </div>
        </div>

        {/* User-Agent Row */}
        {showUaRow && (
          <div className={`flex items-center gap-2 pt-2 mt-2 border-t ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <span className="text-[11px] font-semibold opacity-60 shrink-0">User-Agent:</span>
            <input
              type="text"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              placeholder="Mozilla/5.0..."
              className={`flex-1 border rounded px-2 py-1 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-800'
              }`}
            />
            <button
              type="button"
              onClick={() => setUserAgent(getStandardUserAgent(browser, os, device))}
              className={`text-[11px] font-medium shrink-0 px-2 py-1 rounded ${
                isDark ? 'text-indigo-400 hover:bg-slate-800' : 'text-indigo-600 hover:bg-slate-200'
              }`}
            >
              Reset UA
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          4. CENTRAL BROWSER DISPLAY AREA
          Zero static survey cards, zero mock questions.
          Renders iframe when URL opened, or a completely clean viewport when blank.
          ======================================================== */}
      <div className={`flex-1 p-2 sm:p-4 flex items-center justify-center overflow-hidden min-h-0 ${
        isDark ? 'bg-slate-950' : 'bg-slate-200'
      }`}>
        {isOpen && activeUrl ? (
          <div 
            className={`rounded-lg shadow-xl border overflow-hidden flex flex-col h-full w-full ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}
            style={{
              maxWidth: device === 'Mobile' ? '420px' : device === 'Tablet' ? '820px' : '100%',
              maxHeight: device === 'Mobile' ? '860px' : device === 'Tablet' ? '1040px' : '100%',
            }}
          >
            {/* Viewport URL badge header */}
            <div className={`px-3 py-1 flex items-center justify-between text-[11px] font-mono border-b select-none shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              <span className="flex items-center gap-1.5 truncate">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span className="truncate">{activeUrl}</span>
              </span>
              <span>{width}×{height} ({device})</span>
            </div>

            {/* Live Web Content Frame */}
            <iframe
              src={activeUrl}
              title="Browser Viewport"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              className="w-full flex-1 border-0 bg-white"
            />
          </div>
        ) : (
          /* Blank clean browser viewport */
          <div className="flex flex-col items-center justify-center text-center opacity-30 select-none">
            <Globe className="w-16 h-16 stroke-[1.25] mb-2" />
          </div>
        )}
      </div>
    </div>
  );
}
