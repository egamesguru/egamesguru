"use client";

import {
  Button,
  CheckboxGroup,
  Chip,
  Form,
  useCheckbox,
  VisuallyHidden,
} from "@heroui/react";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { updatePreferences } from "./action";

const defaultGenres = [
  "Platformer",
  "Survival and Horror",
  "Action-Adventures",
  "Puzzlers and Party Games",
  "Simulation and Sports",
  "RPG",
  "MOBA",
  "Shooter (FPS / TPS)",
  "Real-Time Strategy (RTS)",
  "Sandbox",
] as const;

export default function PreferencesForm() {
  return (
    <Form action={updatePreferences} className="space-y-10">
      <CheckboxGroup name="genres" label="Genres" orientation="horizontal">
        {defaultGenres.map((genre) => (
          <ChipCheckbox value={genre}>{genre}</ChipCheckbox>
        ))}
      </CheckboxGroup>

      <Button type="submit" color="primary">
        Übernehmen
      </Button>
    </Form>
  );
}

const ChipCheckbox = (props: { value: string; children: ReactNode }) => {
  const checkboxVariants = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-solid outline-transparent ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({ ...props });

  const styles = checkboxVariants({
    isSelected,
    isFocusVisible,
  });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      {/* @ts-ignore */}
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
