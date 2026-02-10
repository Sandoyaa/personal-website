"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

const EMAIL = "sergeysurzhikov2@gmail.com";

export function EmailButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full justify-center gap-2 transition-transform hover:scale-[1.02]"
      onClick={handleClick}
    >
      {copied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
      {copied ? "Copied!" : "Email"}
    </Button>
  );
}
