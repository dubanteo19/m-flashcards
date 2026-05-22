"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Control, Controller } from "react-hook-form";

export interface Term {
  id: string;
  word: string;
  reading: string;
  meaning: string;
}

interface CollectionFormValues {
  terms: Term[];
}

interface TermFormProps {
  control: Control<CollectionFormValues>;
  index: number;
  onRemove: () => void;
}

export const TermForm = ({ control, index, onRemove }: TermFormProps) => {
  return (
    <div className="border rounded-xl p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Term #{index + 1}</h3>
        <Button type="button" size="icon" variant="ghost" onClick={onRemove}>
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Word */}
        <Controller
          control={control}
          name={`terms.${index}.word`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Word" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Reading */}
        <Controller
          control={control}
          name={`terms.${index}.reading`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Reading" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Meaning */}
        <Controller
          control={control}
          name={`terms.${index}.meaning`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Meaning" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </div>
  );
};
