import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown
} from 'lucide-react';

// ============================================================================
// CONSTANTS
// ============================================================================

const DEVICES = [
  { id: 'Desktop', label: 'Desktop', defaultW: 1920, defaultH: 1080 },
  { id: 'Mobile', label: 'Mobile', defaultW: 390, defaultH: 844 },
  { id: 'Tablet', label: 'Tablet', defaultW: 768, defaultH: 1024 },
];

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
  { code: 'BR', name: 'Brazil', locale: 'pt-BR', tz: 'America/Sao_Paulo' },
  { code: 'SG', name: 'Singapore', locale: 'en-SG', tz: 'Asia/Singapore' },
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
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney',
  'UTC',
];

const RESOLUTION_PRESETS = [
  { label: '1920 × 1080 (FHD)', width: 1920, height: 1080 },
  { label: '1440 × 900 (Laptop)', width: 1440, height: 900 },
  { label: '1366 × 768 (HD)', width: 1366, height: 768 },
  { label: '2560 × 1440 (2K)', width: 2560, height: 1440 },
  { label: '768 × 1024 (iPad)', width: 768, height: 1024 },
  { label: '390 × 844 (Mobile)', width: 390, height: 844 },
];

// ============================================================================
// CLEAN DROPDOWN COMPONENT (MATCHING USER SCREENSHOT EXACTLY)
// ============================================================================
function CleanDropdown({
  id,
  label,
  value,
  displayValue,
  options,
  onChange,
  openId,
  setOpenId,
  isDark,
  minWidth = 'min-w-[130px]',
}) {
  const isOpen = openId === id;
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (isOpen) setOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpenId]);

  return (
    <div className={`relative inline-block ${minWidth}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpenId(isOpen ? null : id)}
        className={`w-full h-9 px-3 flex items-center justify-between rounded-lg text-xs font-normal border transition-colors cursor-pointer select-none ${
          isOpen
            ? 'border-blue-500 ring-1 ring-blue-500/40 ' + (isDark ? 'bg-[#182337] text-white' : 'bg-blue-50/50 text-blue-900')
            : isDark
            ? 'bg-[#141d2f] hover:bg-[#182337] border-slate-700/80 text-slate-200'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
        }`}
      >
        <span className="truncate pr-2">
          <span className={`text-[11px] mr-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {label}:
          </span>
          <span className="font-medium">
            {displayValue || value}
          </span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
          isOpen ? 'rotate-180 text-blue-400' : isDark ? 'text-slate-400' : 'text-slate-500'
        }`} />
      </button>

      {/* Floating Menu - Exactly matching user screenshot with zero scrollbar */}
      {isOpen && (
        <div className={`absolute top-full mt-1 left-0 min-w-full w-max max-w-xs z-50 rounded-lg border shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-[#141d2f] border-slate-700/80 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-300/40'
        }`}>
          <div className="max-h-56 overflow-y-auto no-scrollbar py-0.5">
            {options.map((opt) => {
              const optId = typeof opt === 'object' ? opt.id || opt.code : opt;
              const optLabel = typeof opt === 'object' ? opt.name || opt.label : opt;
              const isSelected = optId === value || optLabel === value;

              return (
                <button
                  key={optId}
                  type="button"
                  onClick={() => {
                    onChange(optId);
                    setOpenId(null);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer block truncate ${
                    isSelected
                      ? 'bg-blue-600 text-white font-medium'
                      : isDark
                      ? 'hover:bg-[#1e2c44] text-slate-200'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {optLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CLEAN RESOLUTION DROPDOWN
// ============================================================================
function CleanResolutionDropdown({
  width,
  height,
  setWidth,
  setHeight,
  openId,
  setOpenId,
  isDark,
}) {
  const isOpen = openId === 'res';
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (isOpen) setOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpenId]);

  return (
    <div className="relative inline-block min-w-[145px]" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpenId(isOpen ? null : 'res')}
        className={`w-full h-9 px-3 flex items-center justify-between rounded-lg text-xs font-normal border transition-colors cursor-pointer select-none ${
          isOpen
            ? 'border-blue-500 ring-1 ring-blue-500/40 ' + (isDark ? 'bg-[#182337] text-white' : 'bg-blue-50/50 text-blue-900')
            : isDark
            ? 'bg-[#141d2f] hover:bg-[#182337] border-slate-700/80 text-slate-200'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
        }`}
      >
        <span className="truncate pr-2">
          <span className={`text-[11px] mr-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Res:
          </span>
          <span className="font-medium font-mono">
            {width} × {height}
          </span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
          isOpen ? 'rotate-180 text-blue-400' : isDark ? 'text-slate-400' : 'text-slate-500'
        }`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-1 left-0 w-60 z-50 rounded-lg border shadow-2xl overflow-hidden p-1.5 ${
          isDark
            ? 'bg-[#141d2f] border-slate-700/80 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-300/40'
        }`}>
          {/* Presets List without scrollbar */}
          <div className="no-scrollbar">
            {RESOLUTION_PRESETS.map((preset) => {
              const isSelected = preset.width === width && preset.height === height;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setWidth(preset.width);
                    setHeight(preset.height);
                    setOpenId(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors cursor-pointer block truncate ${
                    isSelected
                      ? 'bg-blue-600 text-white font-medium'
                      : isDark
                      ? 'hover:bg-[#1e2c44] text-slate-200'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Custom Dimension Inputs */}
          <div className={`mt-2 pt-2 border-t flex items-center gap-1.5 px-1 ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
              className={`w-20 text-center font-mono text-xs rounded border px-1.5 py-1 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
              placeholder="Width"
            />
            <span className="text-slate-400 text-xs">×</span>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
              className={`w-20 text-center font-mono text-xs rounded border px-1.5 py-1 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
              placeholder="Height"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CLEAN IP INPUT PILL
// ============================================================================
function CleanIpInput({ ipAddress, setIpAddress, isDark }) {
  return (
    <div className={`h-9 px-3 flex items-center rounded-lg text-xs border transition-colors ${
      isDark
        ? 'bg-[#141d2f] border-slate-700/80 text-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40'
        : 'bg-white border-slate-300 text-slate-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40'
    }`}>
      <span className={`text-[11px] mr-1.5 select-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        IP:
      </span>
      <input
        type="text"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        placeholder="Authorized IP"
        className="w-24 font-mono text-xs bg-transparent focus:outline-none placeholder:opacity-40"
      />
      {ipAddress && (
        <button
          type="button"
          onClick={() => setIpAddress('')}
          className="ml-1 opacity-40 hover:opacity-100 p-0.5"
          title="Clear"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // URL State
  const [urlInput, setUrlInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Settings
  const [device, setDevice] = useState('Desktop');
  const [browser, setBrowser] = useState('Chrome');
  const [os, setOs] = useState('Windows');
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [country, setCountry] = useState('US');
  const [locale, setLocale] = useState('en-US');
  const [timezone, setTimezone] = useState('America/New_York');
  const [ipAddress, setIpAddress] = useState('');

  const handleDeviceChange = (newDevice) => {
    setDevice(newDevice);
    const dev = DEVICES.find((d) => d.id === newDevice);
    if (dev) {
      setWidth(dev.defaultW);
      setHeight(dev.defaultH);
    }
    if (newDevice === 'Mobile') {
      if (os !== 'iOS' && os !== 'Android') setOs('Android');
    } else if (newDevice === 'Tablet') {
      if (os !== 'iOS' && os !== 'Android') setOs('iOS');
    } else {
      if (os === 'iOS' || os === 'Android') setOs('Windows');
    }
  };

  const handleCountryChange = (cCode) => {
    setCountry(cCode);
    const found = COUNTRIES.find((c) => c.code === cCode);
    if (found) {
      setLocale(found.locale);
      setTimezone(found.tz);
    }
  };

  const handleActionToggle = (e) => {
    e?.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      setActiveUrl('');
    } else {
      if (!urlInput.trim()) return;
      let target = urlInput.trim();
      if (!target.startsWith('http://') && !target.startsWith('https://')) {
        target = 'https://' + target;
        setUrlInput(target);
      }
      setActiveUrl(target);
      setIsOpen(true);
    }
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

  const selectedCountryObj = COUNTRIES.find((c) => c.code === country);

  return (
    <div className={`h-screen w-screen flex flex-col font-sans select-none overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'
    }`}>
      {/* ========================================================
          1. HEADER: WINDOW DOTS, TAB, DAY/NIGHT TOGGLE
          ======================================================== */}
      <div className={`px-3 pt-2 pb-0 flex items-center justify-between border-b shrink-0 ${
        isDark ? 'bg-slate-900/95 border-slate-800 text-slate-300' : 'bg-slate-200/90 border-slate-300 text-slate-600'
      }`}>
        <div className="flex items-center gap-3">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center gap-1.5 pr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs cursor-pointer hover:opacity-80" />
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs cursor-pointer hover:opacity-80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs cursor-pointer hover:opacity-80" />
          </div>

          {/* Browser Tab */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-t-xl text-xs font-semibold shadow-xs border-t border-x max-w-xs truncate transition-colors ${
            isDark 
              ? 'bg-slate-800 text-slate-100 border-slate-700/80' 
              : 'bg-white text-slate-800 border-slate-300'
          }`}>
            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{getTabTitle()}</span>
            {isOpen && (
              <button
                type="button"
                onClick={() => { setIsOpen(false); setActiveUrl(''); }}
                title="Close"
                className={`p-0.5 rounded ml-1 ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => { setIsOpen(false); setActiveUrl(''); setUrlInput(''); }}
            title="New Tab"
            className={`p-1 rounded transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-300 text-slate-500'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Day / Night Mode Toggle */}
        <div className="flex items-center gap-2 pb-1.5">
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-400 shadow-sm'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-blue-600 shadow-xs'
            }`}
            title={isDark ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] text-slate-200">Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] text-slate-700">Night Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          2. ADDRESS BAR WITH SINGLE ACTION BUTTON
          ======================================================== */}
      <div className={`px-4 py-2 flex items-center gap-3 shrink-0 border-b shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
      }`}>
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

        {/* Address Bar & Single Action Button */}
        <form onSubmit={handleActionToggle} className="flex-1 flex items-center gap-2">
          <div className={`flex-1 flex items-center gap-2.5 border rounded-lg px-3.5 py-1.5 shadow-inner transition-colors ${
            isDark 
              ? 'bg-[#141d2f] border-slate-700/80 focus-within:border-blue-500 text-slate-100' 
              : 'bg-white border-slate-300 focus-within:border-blue-500 text-slate-900 shadow-xs'
          }`}>
            <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter survey URL to test (e.g. https://example.com/survey)..."
              className="w-full text-xs font-mono bg-transparent focus:outline-none placeholder:font-sans placeholder:opacity-40"
            />
            {urlInput && !isOpen && (
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="opacity-40 hover:opacity-100 p-0.5"
                title="Clear URL"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {!isOpen ? (
            <button
              type="submit"
              disabled={!urlInput.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Open URL
            </button>
          ) : (
            <button
              type="button"
              onClick={handleActionToggle}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all shadow-sm shrink-0"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              Discontinue
            </button>
          )}
        </form>
      </div>

      {/* ========================================================
          3. BEAUTIFUL DROPDOWNS & INPUTS TOOLBAR
          Pixel-perfect matching user screenshots with ZERO scrollbars!
          ======================================================== */}
      <div className={`px-4 py-2 text-xs shrink-0 border-b shadow-inner ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300/80 text-slate-700'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Dropdown */}
          <CleanDropdown
            id="device"
            label="Device"
            value={device}
            options={DEVICES.map((d) => d.label)}
            onChange={handleDeviceChange}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[125px]"
          />

          {/* Browser Dropdown */}
          <CleanDropdown
            id="browser"
            label="Browser"
            value={browser}
            options={BROWSERS}
            onChange={setBrowser}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[130px]"
          />

          {/* OS Dropdown */}
          <CleanDropdown
            id="os"
            label="OS"
            value={os}
            options={OPERATING_SYSTEMS}
            onChange={setOs}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[125px]"
          />

          {/* Resolution Dropdown */}
          <CleanResolutionDropdown
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
          />

          {/* Country Dropdown */}
          <CleanDropdown
            id="country"
            label="Country"
            value={country}
            displayValue={selectedCountryObj ? selectedCountryObj.name : country}
            options={COUNTRIES.map((c) => ({ id: c.code, name: c.name }))}
            onChange={handleCountryChange}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[155px]"
          />

          {/* Locale Dropdown */}
          <CleanDropdown
            id="locale"
            label="Locale"
            value={locale}
            options={LOCALES}
            onChange={setLocale}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[120px]"
          />

          {/* Timezone Dropdown */}
          <CleanDropdown
            id="timezone"
            label="TZ"
            value={timezone}
            options={TIMEZONES}
            onChange={setTimezone}
            openId={openDropdownId}
            setOpenId={setOpenDropdownId}
            isDark={isDark}
            minWidth="min-w-[160px]"
          />

          {/* IP Input */}
          <CleanIpInput
            ipAddress={ipAddress}
            setIpAddress={setIpAddress}
            isDark={isDark}
          />
        </div>
      </div>

      {/* ========================================================
          4. CENTRAL BROWSER DISPLAY AREA
          Clean authentic viewport, zero mock cards, zero fake stats.
          ======================================================== */}
      <div className={`flex-1 p-2 sm:p-4 flex items-center justify-center overflow-hidden min-h-0 ${
        isDark ? 'bg-slate-950' : 'bg-slate-200'
      }`}>
        {isOpen && activeUrl ? (
          <div 
            className={`rounded-xl shadow-2xl border overflow-hidden flex flex-col h-full w-full transition-all duration-200 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}
            style={{
              maxWidth: device === 'Mobile' ? '420px' : device === 'Tablet' ? '820px' : '100%',
              maxHeight: device === 'Mobile' ? '860px' : device === 'Tablet' ? '1040px' : '100%',
            }}
          >
            {/* Viewport Info Sub-bar */}
            <div className={`px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono border-b select-none shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              <span className="flex items-center gap-2 truncate">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate">{activeUrl}</span>
              </span>
              <span className="font-semibold">{width}×{height} ({device})</span>
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
          <div className="flex flex-col items-center justify-center text-center opacity-20 select-none">
            <Globe className="w-16 h-16 stroke-[1.25] mb-2" />
          </div>
        )}
      </div>
    </div>
  );
}
