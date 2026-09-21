'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppBackdrop } from '@/components/AppBackdrop';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Check, FileText, Github, Linkedin, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import avatarImg from '../../public/avatar.png';
import bloodSugarImg from '../../public/bloodsugar.png';
import bloodSugarDark from '../../public/bloodsugar-dark.png';
import moneyTrackerBlack from '../../public/moneytracker-black.png';
import moneyTrackerWhite from '../../public/moneytracker-white.png';
import ratesBlack from '../../public/rates-black.png';
import ratesWhite from '../../public/rates-white.png';
import timefeelImg from '../../public/timefeel.png';

const email = 'sergeysurzhikov2@gmail.com';
const cvHref = '/personal-website/cv.pdf';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Sandoyaa',
    icon: Github
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/serhii-surzhykov/',
    icon: Linkedin
  },
  {
    label: 'Telegram',
    href: 'https://t.me/sandoya',
    icon: Send
  }
];

const apps = [
  {
    name: 'Money Tracker',
    description: 'Budget & expenses app',
    href: 'https://apps.apple.com/us/app/money-tracker-budget-app/id6761251964?pt=128631287&ct=website&mt=8',
    iconLight: moneyTrackerBlack,
    iconDark: moneyTrackerWhite,
    backdrop: 'stars'
  },
  {
    name: 'Rates',
    description: 'Live exchange rates',
    href: 'https://apps.apple.com/us/app/currencies-rates-converter/id6761039204?pt=128631287&ct=website&mt=8',
    iconLight: ratesBlack,
    iconDark: ratesWhite,
    backdrop: 'glyphs'
  },
  {
    name: 'TimeFeel',
    description: 'Countdown & progress',
    href: 'https://apps.apple.com/us/app/countdown-progress-timefeel/id6760222007?pt=128631287&ct=website&mt=8',
    iconLight: timefeelImg,
    iconDark: timefeelImg,
    backdrop: 'orbs'
  },
  {
    name: 'Blood Sugar',
    description: 'Glucose & carbs log',
    href: 'https://apps.apple.com/us/app/blood-sugar-glucose-monitor/id6809168539?pt=128631287&ct=website&mt=8',
    iconLight: bloodSugarImg,
    iconDark: bloodSugarDark,
    backdrop: 'wave'
  }
] as const;

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="w-full max-w-lg animate-fade-in space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-48 w-48">
            <AvatarImage src={avatarImg.src} />
            <AvatarFallback className="text-2xl">SS</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Serhii Surzhykov</h1>
            <p className="text-muted-foreground">iOS Developer • Swift & SwiftUI</p>
          </div>
        </div>
        <Separator />

        <section className="grid gap-3 sm:grid-cols-2">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex flex-col items-center gap-3 overflow-hidden rounded-xl border bg-card p-4 text-center transition-all hover:scale-[1.03] hover:shadow-md"
            >
              <AppBackdrop kind={app.backdrop} />
              {/* The text sits on moving artwork, so it gets its own floor — as in the apps' cards.
                  The sea is left bare: it is the paywall's own backdrop, already lit for text. */}
              {app.backdrop !== 'wave' && (
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/20 to-card/60" />
              )}
              <Image
                src={app.iconLight}
                alt={`${app.name} icon`}
                width={64}
                height={64}
                className="relative h-16 w-16 rounded-2xl bg-white p-0.5 shadow-sm dark:hidden"
              />
              <Image
                src={app.iconDark}
                alt={`${app.name} icon`}
                width={64}
                height={64}
                className="relative hidden h-16 w-16 rounded-2xl bg-secondary p-0.5 shadow-sm dark:block"
              />
              <div className="relative space-y-0.5">
                <p className="text-sm font-semibold">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.description}</p>
              </div>
            </a>
          ))}
        </section>

        <Separator />

        <nav className="space-y-3">
          <Button size="lg" className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]" asChild>
            <a href={cvHref} target="_blank" rel="noopener noreferrer">
              <FileText className="h-5 w-5" />
              CV
            </a>
          </Button>
          <div className="grid grid-cols-4 gap-3">
            <button type="button" onClick={handleClick} className="flex flex-col items-center gap-2 rounded-xl border bg-card px-2 py-4 text-xs font-medium transition-all hover:scale-[1.03] hover:shadow-md cursor-pointer">
              {copied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
              {copied ? 'Copied!' : 'Email'}
            </button>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-xl border bg-card px-2 py-4 text-xs font-medium transition-all hover:scale-[1.03] hover:shadow-md"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
}
