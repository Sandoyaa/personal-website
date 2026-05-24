'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Check, FileText, Github, Linkedin, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import avatarImg from '../../public/avatar.png';
import moneyTrackerBlack from '../../public/moneytracker-black.png';
import moneyTrackerWhite from '../../public/moneytracker-white.png';
import ratesBlack from '../../public/rates-black.png';
import ratesWhite from '../../public/rates-white.png';
import timefeelImg from '../../public/timefeel.png';

const email = 'sergeysurzhikov2@gmail.com';

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
    href: 'https://apps.apple.com/us/app/money-tracker-budget-app/id6761251964',
    iconLight: moneyTrackerBlack,
    iconDark: moneyTrackerWhite
  },
  {
    name: 'Currency & Rates Converter',
    description: 'Live exchange rates',
    href: 'https://apps.apple.com/us/app/currencies-rates-converter/id6761039204',
    iconLight: ratesBlack,
    iconDark: ratesWhite
  },
  {
    name: 'TimeFeel',
    description: 'Countdown & progress',
    href: 'https://apps.apple.com/us/app/countdown-progress-timefeel/id6760222007',
    iconLight: timefeelImg,
    iconDark: timefeelImg
  }
];

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

        <section className="grid gap-3 sm:grid-cols-3">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center transition-all hover:scale-[1.03] hover:shadow-md"
            >
              <Image
                src={app.iconLight}
                alt={`${app.name} icon`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl p-0.5 shadow-sm dark:hidden"
              />
              <Image
                src={app.iconDark}
                alt={`${app.name} icon`}
                width={64}
                height={64}
                className="hidden h-16 w-16 rounded-2xl bg-secondary p-0.5 shadow-sm dark:block"
              />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.description}</p>
              </div>
            </a>
          ))}
        </section>

        <Separator />

        <nav className="flex flex-col gap-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]"
            asChild
          >
            <a href="/personal-website/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="h-5 w-5" />
              Resume
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]"
            onClick={handleClick}
          >
            {copied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Email'}
          </Button>
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              size="lg"
              className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]"
              asChild
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="h-5 w-5" />
                {link.label}
              </a>
            </Button>
          ))}
        </nav>
      </main>
    </div>
  );
}
