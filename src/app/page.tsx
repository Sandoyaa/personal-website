'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Check, FileText, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import avatarImg from '../../public/avatar.png';

const email = 'sergeysurzhikov2@gmail.com';

const links = [
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
            <p className="text-muted-foreground">
              Frontend developer with experience in building production web and mobile applications using React and
              TypeScript.
            </p>
          </div>
        </div>
        <Separator />
        {/*LINKS*/}
        <nav className="flex flex-col gap-3">
          {/*RESUME*/}
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
          {links.map((link) => (
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
          {/*EMAIL*/}
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]"
            onClick={handleClick}
          >
            {copied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Email'}
          </Button>
        </nav>
      </main>
    </div>
  );
}
