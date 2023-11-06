"use client";

import { config } from "@/config/shipper.config";
import { Crisp } from "crisp-sdk-web";
import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function SupportButton({}) {
  const handleClick = () => {
    if (config.support?.cripsId) {
      Crisp.configure(config.support?.cripsId, { autoload: false });

      Crisp.chat.onChatClosed(() => {
        Crisp.chat.hide();
      });

      Crisp.chat.show();
      Crisp.chat.open();
    } else if (config.mailgun?.supportEmail) {
      // open default email client in new window with "need help with ${config.appName}" as subject
      window.open(
        `mailto:${config.mailgun.supportEmail}?subject=Need help with ${config.appName}`,
        "_blank",
      );
    }
  };

  return (
    // TODO: Doesn't work. Search how to use keyframes in tailwind wihout polluting the tailconfig file
    <div
      className="fixed bottom-0 right-[var(--spacing)]
        isolate
        z-50
        [--spacing:32px]
        [animation-delay:2000ms]
        [animation:rise_500ms_both]
    "
    >
      <Keyframes />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          handleClick();
        }}
        className="text-base-content/50 backdrop-blur-sm"
      >
        <HelpCircle />
        Ayuda
      </Button>
    </div>
  );
}

const Keyframes = () => {
  return (
    <style>{`
    @keyframes rise {
        0% {
          transform: translateY(calc(100%));
        }
        100% {
          transform: translateY(calc(-1*var(--spacing))) translateX(0);
        }
      }

    
    `}</style>
  );
};
