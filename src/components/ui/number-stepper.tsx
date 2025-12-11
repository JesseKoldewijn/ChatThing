import { useState, useEffect, useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberStepperProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	className?: string;
	allowManualInput?: boolean;
}

export const NumberStepper = ({
	value,
	onChange,
	min = 0,
	max = 999,
	step = 1,
	disabled = false,
	className,
	allowManualInput = true,
}: NumberStepperProps) => {
	const [inputValue, setInputValue] = useState(String(value));

	// Sync input value with external value changes
	useEffect(() => {
		setInputValue(String(value));
	}, [value]);

	const clamp = useCallback(
		(val: number) => Math.min(max, Math.max(min, val)),
		[min, max]
	);

	const handleIncrement = () => {
		const newValue = clamp(value + step);
		onChange(newValue);
	};

	const handleDecrement = () => {
		const newValue = clamp(value - step);
		onChange(newValue);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		// Allow empty string for typing
		if (newValue === "" || /^\d*$/.test(newValue)) {
			setInputValue(newValue);
		}
	};

	const handleInputBlur = () => {
		const parsed = parseInt(inputValue, 10);
		if (isNaN(parsed)) {
			setInputValue(String(value));
		} else {
			const clamped = clamp(parsed);
			onChange(clamped);
			setInputValue(String(clamped));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleInputBlur();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			handleIncrement();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			handleDecrement();
		}
	};

	return (
		<div
			className={cn(
				"inline-flex items-center rounded-lg border border-input bg-background",
				"focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
				className
			)}
		>
			<button
				type="button"
				onClick={handleDecrement}
				disabled={disabled || value <= min}
				className={cn(
					"flex h-9 w-9 shrink-0 items-center justify-center rounded-l-md transition-colors text-foreground",
					"hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
					"focus:outline-none"
				)}
			>
				<Minus className="h-4 w-4" />
			</button>
			<div className="h-6 w-px bg-border" />
			{allowManualInput ? (
				<input
					type="text"
					inputMode="numeric"
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					className={cn(
						"h-9 w-12 bg-transparent text-center text-sm font-medium text-foreground",
						"focus:outline-none disabled:pointer-events-none disabled:opacity-50",
						"[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					)}
				/>
			) : (
				<div className="flex h-9 w-12 items-center justify-center text-sm font-medium text-foreground">
					{value}
				</div>
			)}
			<div className="h-6 w-px bg-border" />
			<button
				type="button"
				onClick={handleIncrement}
				disabled={disabled || value >= max}
				className={cn(
					"flex h-9 w-9 shrink-0 items-center justify-center rounded-r-md transition-colors text-foreground",
					"hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
					"focus:outline-none"
				)}
			>
				<Plus className="h-4 w-4" />
			</button>
		</div>
	);
};

