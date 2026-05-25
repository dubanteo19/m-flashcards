"use client";

import { Flag } from "@/components/flag-icon";
import Flashcard from "@/components/flashcard";
import { LearnDone } from "@/components/learn-done";
import FullPageLoader from "@/components/loader";
import { CollectionNotFound } from "@/components/not-found/collection-not-found";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { useCollectionBySlug } from "@/hooks/useColleciton";
import { cn, shuffleArray } from "@/app/lib/utils";
import { historyService } from "@/services/history.service";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, RepeatIcon, Shuffle } from "lucide-react";
import { useTranslations } from "next-intl";
import { use, useCallback, useEffect, useMemo, useState } from "react";

export default function LearnPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);
	const t = useTranslations("learn");
	const { data: collection, isLoading } = useCollectionBySlug(slug);
	const [isLoopMode, setIsLoopMode] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [shouldShuffle, setShouldShuffle] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [[page, direction], setPage] = useState([0, 0]);
	const cards = useMemo(() => {
		const sourceCards = collection?.cards ?? [];
		return shouldShuffle ? shuffleArray(sourceCards) : sourceCards;
	}, [collection?.cards, shouldShuffle]);

	const currentIndex = ((page % cards.length) + cards.length) % cards.length;
	const paginate = useCallback(
		(newDirection: number) => {
			const nextPage = page + newDirection;

			if (!isLoopMode) {
				if (nextPage < 0) {
					setPage([0, 0]);
					return;
				}
				if (nextPage === cards.length - 1) {
					setIsCompleted(true);
				}
				if (nextPage >= cards.length) {
					setPage([cards.length - 1, 0]);
					return;
				}
			}

			setPage([nextPage, newDirection]);
		},
		[page, isLoopMode, cards.length],
	);

	// 1. Keyboard Navigation Logic
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") paginate(-1);
			if (e.key === "ArrowRight") paginate(1);
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [paginate]);

	// 2. Swipe Logic
	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity;
	};

	const onDragEnd = (_: any, { offset, velocity }: PanInfo) => {
		const swipe = swipePower(offset.x, velocity.x);

		if (swipe < -swipeConfidenceThreshold) {
			paginate(1);
		} else if (swipe > swipeConfidenceThreshold) {
			paginate(-1);
		}
	};

	useEffect(() => {
		if (collection) {
			historyService.addToHistory(collection);
		}
	}, [collection]);

	if (isLoading) return <FullPageLoader />;

	if (!collection || cards.length === 0) return <CollectionNotFound />;

	return (
		<div className="flex-1 bg-slate-50 flex justify-center items-center flex-col  p-4 overflow-hidden">
			<Flag size="md" language={collection.language} />
			<div className="max-w-md mx-auto mb-2">
				<h2 className="text-center">{collection.title}</h2>
				<p className="text-muted-foreground text-sm max-w-md  mx-auto my-2 italic break-all">
					{collection.description}
				</p>

				<p className="text-primary font-medium text-center">
					{t("cardProgress", {
						current: currentIndex + 1,
						total: cards.length,
					})}
				</p>
			</div>
			<div className="relative shadow w-full max-w-md lg:h-64  flex-center">
				<AnimatePresence initial={false} custom={direction} mode="popLayout">
					<motion.div
						key={page}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						drag="x"
						onDragStart={() => setIsDragging(true)}
						onDragEnd={(e, info) => {
							onDragEnd(e, info);
							setTimeout(() => setIsDragging(false), 100);
						}}
						className={cn(
							"w-full",
							isDragging ? "pointer-events-none" : "pointer-events-auto",
						)}
					>
						<Flashcard
							language={collection.language}
							card={cards[currentIndex]}
						/>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="flex gap-4 mt-4 items-baseline">
				<Button variant="outline" size="lg" onClick={() => paginate(-1)}>
					<ArrowLeft className="size-4" />
				</Button>

				<Button size="lg" onClick={() => paginate(1)}>
					<ArrowRight className="size-4" />
				</Button>
			</div>
			<div className=" flex-center gap-2 mt-2">
				<ActionButton
					type="button"
					label={t("loop")}
					onClick={() => setIsLoopMode((prev) => !prev)}
					size={"icon"}
					variant={isLoopMode ? "default" : "outline"}
					className=" rounded-full"
				>
					<RepeatIcon className="w-4" />
				</ActionButton>
				<ActionButton
					type="button"
					label={t("shuffle")}
					onClick={() => {
						setShouldShuffle((prev) => !prev);
						setPage([0, 0]);
					}}
					size={"icon"}
					variant={shouldShuffle ? "destructive" : "outline"}
					className=" rounded-full"
				>
					<Shuffle className="w-4" />
				</ActionButton>
			</div>
			{isCompleted && (
				<LearnDone
					slug={slug}
					setIsCompleted={setIsCompleted}
					title={collection.title}
				/>
			)}
		</div>
	);
}

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 300 : -300,
		opacity: 0,
		scale: 0.9,
	}),
	center: { x: 0, opacity: 1, scale: 1 },
	exit: (direction: number) => ({
		x: direction < 0 ? 300 : -300,
		opacity: 0,
		scale: 0.9,
	}),
};
