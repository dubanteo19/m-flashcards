import { ROUTES } from "@/app/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { LinkButton } from "./ui/link-button";

interface LearnDoneProps {
  title: string;
  slug: string;
  setIsCompleted: (value: boolean) => void;
}

export const LearnDone = ({
  title,
  slug,
  setIsCompleted,
}: LearnDoneProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: -40 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 right-6 z-50"
      >
        <Card className="w-[340px] p-5 shadow-xl rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                Hoàn thành 🎉
              </h3>
              <p className="text-sm text-muted-foreground">
                Đã xong bộ {title}
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                setIsCompleted(false)
              }
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="grid gap-2 mt-4">
            <LinkButton
              size="sm"
              href={ROUTES.LEARN_QUIZ(slug)}
            >
              Làm Quiz
            </LinkButton>

            <LinkButton
              size="sm"
              variant="outline"
              href="/"
            >
              Flashcards liên quan
            </LinkButton>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
