import React from 'react';
import { Sparkles, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, isLoading } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        await loginWithGoogle(codeResponse.code);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to log in with Google', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <div className="min-h-screen w-full flex bg-[#030712] text-slate-200 font-sans">
      {/* Left Column - Marketing/Info */}
      <div className="flex-1 flex flex-col p-12 lg:p-20 justify-between relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-24">
            <div className="w-8 h-8 rounded bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">Nexus Mail</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              The intelligent assistant that runs your inbox on autopilot
            </h1>
            <p className="text-lg text-slate-400 mb-12">
              Automatically drafts replies, organizes streams, and surfaces key follow-ups while you sleep.
            </p>

            {/* Feature Cards Showcase */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-slate-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Live Parsing</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
                  </div>
                  <span className="text-[10px] text-slate-500">Just now</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Subject: Action Required: Contract Q4 Deliverables</h3>
                <p className="text-xs text-slate-400 mb-4">"Hey Alex, we need the final sign-off on the roadmap adjustments by Thursday..."</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Priority action detected
                  </span>
                  <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold">
                    Calendar invite synced
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Draft Suggestion</span>
                  </div>
                  <span className="text-[10px] font-semibold text-teal-400">98% confidence</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                  "Hi Sarah, confirming that the adjusted Q4 roadmap dates look great. I have blocked out Thursday morning to finalize..."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Tone: Concise · Professional</span>
                  <button className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs font-semibold transition-colors">
                    Approve & Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="relative z-10 flex items-center gap-12 pt-12 border-t border-slate-800/50 mt-12">
          <div>
            <div className="text-2xl font-bold text-white mb-1">4.8M+</div>
            <div className="text-xs text-slate-500">Emails processed daily</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">12,000+</div>
            <div className="text-xs text-slate-500">Hours saved by professionals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">SOC-2</div>
            <div className="text-xs text-slate-500">Enterprise-grade security</div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Panel */}
      <div className="w-[480px] bg-[#060a16] border-l border-slate-800 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-sm">
          <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-teal-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Nexus Mail</h2>
            <p className="text-sm text-slate-400 mb-8 px-4">
              Sign in to activate your intelligent AI assistant workspace.
            </p>

            <button 
              onClick={() => handleGoogleLogin()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-semibold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors mb-4 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            <div className="flex items-center gap-1.5 text-xs text-emerald-500/80 mb-8">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official OAuth2 verification with Google SSL</span>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed max-w-xs">
              By continuing, you agree to Nexus Mail's <br />
              <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-600 flex items-center gap-2">
          <span>Nexus Engine v1.50_Stable</span>
          <span> </span>
          <span className="flex items-center gap-1">
            Active Safeguards: ON <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
          </span>
        </div>
      </div>
    </div>
  );
}
