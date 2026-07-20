"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/Button";

export interface CopyButtonProps extends Omit<ButtonProps, "children" | "onClick"> {
  value: string;
  label?: string;
  copiedLabel?: string;
}

/** Button that copies `value` to the clipboard and briefly confirms. */
export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied!",
  variant = "outline",
  size = "md",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      leftIcon={copied ? <Check /> : <Copy />}
      {...props}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
