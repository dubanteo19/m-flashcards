import { ChatGPTIcon } from "@/components/icons/chatgpt";
import { GeminiIcon } from "@/components/icons/gimini-icon";
import { Button } from "@/components/ui/button";

interface AIButtonsProps {
  name?: string;
}
export default function AIButtons({ name }: AIButtonsProps) {
  return (
    <div className="flex items-center gap-2" name={name}>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="gap-2 transition-all hover:scale-105 active:scale-95 border-emerald-500/30 hover:border-emerald-500 animate-pulse-outward"
      >
        <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">
          <ChatGPTIcon className="size-4" />
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="gap-2 transition-all hover:scale-105 active:scale-95 border-blue-500/30 hover:border-blue-500 animate-pulse-outward [animation-delay:200ms]"
      >
        <a
          href="https://gemini.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GeminiIcon className="size-4" />
        </a>
      </Button>
    </div>
  );
}
