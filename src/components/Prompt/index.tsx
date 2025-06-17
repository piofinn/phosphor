import clsx from "clsx";
import { useState, useId, useEffect, } from "react";

import styles from "./prompt.module.css";

export type Action = {
    type: "link" | "dialog";
    target: string;
}

export type Command = {
    command: string;
    action: Action;
}

export interface PromptProps {
    prompt?: string;
    commands?: Command[];
    className?: string;
    disabled?: boolean;

    onCommand?: (command: string, action: Action) => void;
    onEscape?: () => void;
    onRendered?: () => void;
}

export const PROMPT_DEFAULT = "$> ";

export const Prompt = (props: PromptProps) => {
    const { prompt, className, commands, onRendered } = props;
    const promptId = `prompt-${useId()}`;
    const [value, setValue] = useState("");

    useEffect(() => {
        onRendered?.();
    }, [onRendered]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (commands && commands.length > 0) {
            const command = commands.find(element => element.command === value);
            setValue("");
            if (command && props.onCommand) {
                props.onCommand(value, command.action);
            }
        }
    };

    return (
        <form className={clsx(styles.prompt, className)} onSubmit={handleSubmit}>
            <label htmlFor={promptId}>{prompt || PROMPT_DEFAULT}</label>
            <input className={styles.input} type="text" id={promptId} autoComplete="off" value={value} onChange={(evt) => { setValue(evt.target.value) }} />
            <span className={styles.text}>{value}</span>
        </form>
    )
}

export default Prompt;
