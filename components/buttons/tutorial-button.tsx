declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
}
import {
  appendRipple,
  removeAllRipples,
} from "@/app/lib/helper/element-helper";
import { offset } from "@floating-ui/dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useShepherd } from "react-shepherd";

import type { StepOptions } from "shepherd.js";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    scrollTo: { behavior: "smooth", block: "center" } as const,
    classes:
      "rounded-lg border bg-popover text-popover-foreground shadow-md shadow-black/5",
  },
  useModalOverlay: true,
};

export default function TutorialButton() {
  const fields = [
    { id: "language-selector", text: "Chọn ngôn ngữ bạn muốn học" },
    { id: "title", text: "Nhập tiêu đề của bộ sưu tập ở đây" },
    {
      id: "sourceText",
      text: "Nhập chủ đề, đoạn văn, bài báo hoặc bài nhạc mà bạn muốn AI tạo ra ở đây",
    },
    { id: "copy-prompt", text: "Nhấn vào nút sao chép để sao chép prompt" },
    { id: "ai-tools", text: "Nhấn vào nút một trong hai nút này để mở AI" },
    {
      hasImage: true,
      id: "paste-prompt",
      text: `<div>
        <p>Dán prompt vừa sao chép vào AI</p>
        <img src="/shepherd/paste-prompt.png" />
      </div>`,
    },
    {
      hasImage: true,
      id: "copy-result",
      text: `<div>
        <p>Nhấn nút copy</p>
        <img src="/shepherd/copy-result.png" />
      </div>`,
    },
    { id: "jsonInput", text: "Dán kết quả (JSON) vừa sao chép vào đây" },
    { id: "submit", text: "Nhấn nút này để lưu bộ sưu tập" },
  ];

  const Shepherd = useShepherd();

  const steps: StepOptions[] = fields.map(({ id, text, hasImage }, index) => {
    const isCopyPromptStep = id === "copy-prompt";

    return {
      id,
      text,
      attachTo: {
        element: `[name="${id}"]`,
        on: "bottom",
      },
      classes: hasImage ? "!max-w-xl md:!max-w-2xl" : "!max-w-sm",
      modalOverlayOpeningPadding: 8,
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 20, crossAxis: 12 })],
      },
      buttons: isCopyPromptStep
        ? []
        : [
            {
              text: index === fields.length - 1 ? "Kết thúc" : "Tiếp theo",
              action() {
                return index === fields.length - 1
                  ? tour.complete()
                  : tour.next();
              },
            },
          ],
      when: {
        show() {
          removeAllRipples();
          const targetEl = document.querySelector(`[name="${id}"]`);
          if (targetEl) {
            appendRipple(targetEl);
          }
          if (isCopyPromptStep && targetEl) {
            const advanceTour = () => {
              setTimeout(() => {
                tour.next();
              }, 300);
              targetEl.removeEventListener("click", advanceTour);
            };
            targetEl.addEventListener("click", advanceTour);
          }
        },
        hide() {
          removeAllRipples();
        },
        destroy() {
          removeAllRipples();
        },
      },
    };
  });

  const tour = useMemo(
    () =>
      new Shepherd.Tour({
        ...tourOptions,
        steps,
      }),
    [, steps, Shepherd],
  );

  return (
    <div>
      <Button size="sm" variant="destructive" onClick={() => tour.start()}>
        Hướng dẫn sử dụng
      </Button>
    </div>
  );
}
