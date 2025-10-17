"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Bell,
  ArrowRight,
  PlayCircle,
  Activity,
  TrendingUp,
  Star,
  CalendarDays,
  Clock,
  Newspaper,
  Timer,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * BOXING PULSE — HOMEPAGE
 * Fully compatible with Next.js 15 App Router
 * Paste this into `src/app/page.tsx`
 */

type Fight = {
  id: string;
  a: string;
  b: string;
  dateISO: string;
  venue: string;
  tv: string;
  titles: string[];
  weight: string;
};

// ---------------------------
// Mock data & fetch shims
// ---------------------------
function fetchSchedule(): Promise<Fight[]> {
  return Promise.resolve([
    {
      id: "1",
      a: "J. Taylor",
      b: "R. Davies",
      dateISO: new Date(Date.now() + 86400000 * 12).toISOString(),
      venue: "O2 Arena, London",
      tv: "DAZN",
      titles: ["WBA", "IBF"],
      weight: "Super-Lightweight (140lb)",
    },
    {
      id: "2",
      a: "J. Opetaia",
      b: "M. Briedis",
      dateISO: new Date(Date.now() + 86400000 * 20).toISOString(),
      venue: "T-Mobile, Las Vegas",
      tv: "ESPN+",
      titles: ["IBF"],
      weight: "Cruiserweight (200lb)",
    },
    {
      id: "3",
      a: "C. Shields",
      b: "S. Marshall",
      dateISO: new Date(Date.now() + 86400000 * 30).toISOString(),
      venue: "AO Arena, Manchester",
      tv: "Sky Sports",
      titles: ["Undisputed"],
      weight: "Middleweight (160lb)",
    },
  ]);
}

function fetchNews() {
  return Promise.resolve([
    {
      tag: "Interview",
      title: "Taylor on camp tweaks for Davies rematch",
      by: "Boxing Pulse Staff",
      mins: 4,
    },
    {
      tag: "Breaking",
      title: "Cruiserweight shake-up as IBF orders eliminator",
      by: "Amira Khan",
      mins: 2,
    },
    {
      tag: "Analysis",
      title: "Feint patterns that unlocked the southpaw lead",
      by: "Coach Brian",
      mins: 6,
    },
    {
      tag: "Business",
      title: "UK broadcast rights: what changes in 2026?",
      by: "M. Singh",
      mins: 5,
    },
  ]);
}

const statSeries = [
  { round: 1, jabs: 9, power: 7, acc: 24 },
  { round: 2, jabs: 12, power: 8, acc: 28 },
  { round: 3, jabs: 14, power: 9, acc: 31 },
  { round: 4, jabs: 13, power: 11, acc: 34 },
  { round: 5, jabs: 10, power: 12, acc: 33 },
  { round: 6, jabs: 16, power: 13, acc: 37 },
];

// ---------------------------
// UI Primitives
// ---------------------------
function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: any) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "secondary"
      ? "bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
      : variant === "link"
      ? "text-neutral-300 hover:text-white"
      : "bg-white text-black hover:opacity-90";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({
  children,
  className = "",
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "secondary" | "outline";
}) {
  const styles =
    variant === "outline"
      ? "border border-neutral-700 text-neutral-200"
      : variant === "secondary"
      ? "bg-neutral-800 text-neutral-200"
      : "bg-white text-black";
  return (
    <span
      className={`inline-flex items-center rounded-xl px-2 py-1 text-xs ${styles} ${className}`}
    >
      {children}
    </span>
  );
}

// ---------------------------
// Main Component
// ---------------------------
export default function BoxingPulsePage() {
  const [upcoming, setUpcoming] = useState<Fight[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchSchedule().then((d) => mounted && setUpcoming(d));
    fetchNews().then((d) => mounted && setNews(d));
    return () => {
      mounted = false;
    };
  }, []);

  const firstThree = useMemo(() => upcoming.slice(0, 3), [upcoming]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-2xl bg-neutral-800 grid place-items-center shadow-md">
              <Trophy className="size-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Boxing Pulse</span>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </div>
          <div className="hidden gap-6 md:flex text-sm text-neutral-300">
            <a href="#schedule" className="hover:text-white">
              Schedule
            </a>
            <a href="#rankings" className="hover:text-white">
              Rankings
            </a>
            <a href="#news" className="hover:text-white">
              News
            </a>
            <a href="#stats" className="hover:text-white">
              Stats
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <Bell className="mr-2 size-4" /> Alerts
            </Button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Real-time boxing news, rankings & live results
            </h1>
            <p className="mt-4 text-neutral-300 text-lg">
              Follow the fight game like a pro. Instant schedules, credible
              rankings, punch-by-punch stats, and coach-level analysis — all in
              one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button>
                Get Started <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button variant="secondary">
                <PlayCircle className="mr-2 size-5" /> Watch Highlights
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWS SNAPSHOTS */}
      <section id="news" className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="size-5" /> Latest Headlines
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {news.slice(0, 4).map((n, i) => (
            <article
              key={i}
              className="border-neutral-800 bg-neutral-900/60 hover:shadow-lg transition rounded-2xl border p-4"
            >
              <Badge>{n.tag}</Badge>
              <h3 className="mt-2 text-lg font-semibold leading-snug">
                {n.title}
              </h3>
              <p className="text-sm text-neutral-300">
                By {n.by} · {n.mins} min read
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Boxing Pulse. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="#" aria-label="Twitter">
              X
            </a>
            <a href="#" aria-label="YouTube">
              YouTube
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
