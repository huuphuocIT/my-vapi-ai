"use client";

import { useCallback } from "react";
import type { FC, FormEvent, MouseEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useMutation as useConvexMutation } from "convex/react";
import axios from "axios";

import { Id } from "@workspace/backend/_generated/dataModel";
import { api } from "@workspace/backend/_generated/api";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";

import { authFormSchema } from "@/modules/vapi/configs/schema";
import { Widget, WidgetHeader, WidgetContent } from "@/modules/vapi/components";
import { useViewStore } from "@/modules/vapi/stores/view";

interface AuthWidgetProps {}

export const AuthWidget: FC<AuthWidgetProps> = () => {
  const { setView } = useViewStore();

  const { isPending, mutate: createContactSession } = useMutation({
    mutationFn: async (contactSessionId: Id<"contactSessions">) => {
      const resp = await axios.post("/api/create-contact-session", {
        contactSessionId,
      });

      return resp.data;
    },
    onSuccess: () => {
      form.reset();
      setView("selection", "Welcome to Nami AI!!!");
    },
  });

  const createSession = useConvexMutation(api.contactSessions.create);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: { onChange: authFormSchema, onSubmit: authFormSchema },
    onSubmit: async ({ value }) => {
      try {
        const metadata = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timezoneOffset: new Date().getTimezoneOffset(),
          screenResolution: `${screen.width}x${screen.height}`,
          viewPortSize: `${window.innerWidth}x${window.innerHeight}`,
        };

        const contactSessionId = await createSession({
          name: value.name,
          email: value.email,
          meta: metadata,
        });

        await createContactSession(contactSessionId);
      } catch (error) {
        throw new Error("Failed to create contact session");
      }
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.handleSubmit();
    },
    [form]
  );

  const handleReset = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
  }, []);

  return (
    <Widget>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi there !!! 👋</p>
          <p className="text-lg">Let&apos;s get started !!!</p>
        </div>
      </WidgetHeader>

      <WidgetContent>
        <form
          id="auth-contact-form"
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="hidden">
                      Name:{" "}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g John Doe"
                      autoComplete="off"
                      type="text"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="hidden">
                      Email:{" "}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g john.doe@example.com"
                      autoComplete="off"
                      type="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  className="md:flex-1 w-full"
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? "..." : "Continue"}
                </Button>
                <Button
                  className="md:flex-1 w-full"
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            )}
          />
        </form>
      </WidgetContent>
    </Widget>
  );
};

export default AuthWidget;
