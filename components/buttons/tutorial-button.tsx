import { ShepherdJourneyProvider, useShepherd } from 'react-shepherd';
import { offset } from '@floating-ui/dom';
import type { StepOptions } from 'shepherd.js';
import { useEffect, useMemo } from 'react';

const tourOptions = {
    defaultStepOptions: {
        cancelIcon: {
            enabled: true
        },
        scrollTo: { behavior: 'smooth', block: 'center' } as const,
        classes: 'rounded-lg border bg-popover text-popover-foreground shadow-md shadow-black/5'
    },
    useModalOverlay: true
};
const appendRipple = (element: Element) => {
    const target = element as HTMLElement;
    const parent = target.parentElement;
    if (!parent) return;

    // Ensure parent layout can anchor absolute children safely
    const parentComputedStyle = window.getComputedStyle(parent);
    if (parentComputedStyle.position === 'static') {
        parent.style.position = 'relative';
    }

    const rippleWrapper = document.createElement('div');
    rippleWrapper.className = 'tour-ripple-container-wrapper';

    // Compute sizes dynamically to handle the input element layout bounding rectangle
    const rect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    // Map top and left properties relative to the parent box offset limits
    const topOffset = rect.top - parentRect.top + rect.height / 2;
    const leftOffset = rect.left - parentRect.left + rect.width / 2;

    rippleWrapper.style.position = 'absolute';
    rippleWrapper.style.top = `${topOffset}px`;
    rippleWrapper.style.left = `${leftOffset}px`;
    rippleWrapper.style.transform = 'translate(-50%, -50%)';
    rippleWrapper.style.pointerEvents = 'none';
    rippleWrapper.style.zIndex = '9999';

    rippleWrapper.innerHTML = `
        <div class="tour-ripple-container">
            <div class="tour-ripple-core"></div>
            <div class="tour-ripple-wave"></div>
            <div class="tour-ripple-wave-delayed"></div>
        </div>
    `;

    // Append to parent instead of breaking void input nodes
    parent.appendChild(rippleWrapper);
};

const removeAllRipples = () => {
    document.querySelectorAll('.tour-ripple-container-wrapper').forEach(ripple => ripple.remove());
};
const Button = ({ isCreating }: { isCreating: boolean }) => {
    const fields = [
        { id: "title", text: "Nhập tiêu đề của bộ sưu tập ở đây" },
        {
            id: "sourceText",
            text: "Nhập chủ đề, đoạn văn, bài báo hoặc bài nhạc ở đây",
        },
        { id: "copy-prompt", text: "Nhấn vào nút sao chép để sao chép prompt" },
        { id: "ai-tools", text: "Nhấn vào nút AI tools để mở AI tools" },
        {
            hasImage: true,
            id: "paste-prompt",
            text: `<div>
        <p>Dán prompt vào AI</p>
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
        { id: "jsonInput", text: "Dán JSON vào đây" },
        { id: "submit", text: "Nhấn nút này để lưu bộ sưu tập" },
    ];

    const Shepherd = useShepherd();

    const steps: StepOptions[] = fields.map(({ id, text, hasImage }, index) => {
        // Determine if this is our special interactive trigger step
        const isCopyPromptStep = id === "copy-prompt";

        return {
            id,
            text,
            attachTo: {
                element: `[name="${id}"]`,
                on: "bottom",
            },
            classes: hasImage ? '!max-w-xl md:!max-w-2xl' : '!max-w-sm',
            modalOverlayOpeningPadding: 8,
            floatingUIOptions: {
                middleware: [offset({ mainAxis: 20, crossAxis: 12 })]
            },
            // 1. Hide the button array completely if it's the copy-prompt step
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
                    removeAllRipples()
                    const targetEl = document.querySelector(`[name="${id}"]`);
                    if (targetEl) {
                        appendRipple(targetEl);
                    }
                    if (isCopyPromptStep && targetEl) {
                        const advanceTour = () => {
                            tour.next();
                            targetEl.removeEventListener('click', advanceTour);
                        };
                        targetEl.addEventListener('click', advanceTour);
                    }
                },
                hide() {
                    removeAllRipples();
                },
                destroy() {
                    removeAllRipples();
                }
            }
        };
    });

    const welcomeStep: StepOptions = useMemo(() => ({
        id: "welcome-prompt",
        text: `
            <div class="text-center p-2">
                <h3 class="text-base font-bold mb-1">Chào mừng bạn! 👋</h3>
                <p class="text-sm text-muted-foreground">Bạn có muốn xem hướng dẫn nhanh cách tạo bộ sưu tập flashcard bằng AI không?</p>
            </div>
        `,
        classes: '!max-w-md built-in-welcome-card',
        buttons: [
            {
                text: "Bỏ qua",
                classes: "shepherd-button-secondary bg-transparent border hover:bg-accent text-foreground px-4 py-2 rounded-md mr-2 text-sm",
                action() {
                    localStorage.setItem("m-flashcards-skip-tutorial", "true");
                    return tour.cancel();
                },
            },
            {
                text: "Xem hướng dẫn",
                classes: "shepherd-button-primary bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm",
                action() {
                    return tour.next();
                },
            },
        ],
    }), []);

    // Combine steps arrays together
    const tour = useMemo(() => new Shepherd.Tour({
        ...tourOptions,
        steps: [welcomeStep, ...steps],
    }), [, steps, welcomeStep, Shepherd]);

    // 3. Auto-start condition checks inside useEffect hook boundary
    useEffect(() => {
        const hasSkipped = localStorage.getItem("m-flashcards-skip-tutorial");

        if (isCreating && !hasSkipped) {
            const timer = setTimeout(() => {
                tour.start();
            }, 800); // Tiny layout stabilization delay buffer
            return () => clearTimeout(timer);
        }
    }, [isCreating, tour]);

    return (
        <button className="button dark" onClick={() => tour.start()}>
            Hướng dẫn
        </button>
    );
}

interface TutorialButtonProps {
    isCreating: boolean;
}

export default function TutorialButton({ isCreating }: TutorialButtonProps) {
    return (
        <ShepherdJourneyProvider>
            <Button isCreating={isCreating} />
        </ShepherdJourneyProvider>
    );
}