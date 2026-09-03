"use client";

import { useState } from "react";
import { Mail, User, Search } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { DateInput } from "@/components/ui/DateInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio, RadioGroup } from "@/components/ui/Radio";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function FormsPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && !emailRe.test(email);

  return (
    <div>
      <PageHeader titleKey="page.forms.title" descKey="page.forms.desc" />

      <div className="space-y-12">
        <Section title="Text inputs" description="Labels, hints, icons, and helper text via the FormField wrapper.">
          <div className="grid gap-5 rounded-xl border border-border bg-surface p-6 shadow-card sm:grid-cols-2">
            <FormField label="Full name" htmlFor="f-name" hint="As it appears on certificates">
              <Input id="f-name" placeholder="Jane Cooper" leftIcon={<User />} />
            </FormField>
            <FormField label="Email address" htmlFor="f-email">
              <Input id="f-email" type="email" placeholder="you@example.com" leftIcon={<Mail />} />
            </FormField>
            <FormField label="Password" htmlFor="f-pass" hint="At least 8 characters">
              <PasswordInput id="f-pass" placeholder="••••••••" />
            </FormField>
            <FormField label="Enrollment date" htmlFor="f-date">
              <DateInput id="f-date" defaultValue="2026-07-15" />
            </FormField>
          </div>
        </Section>

        <Section title="Select & textarea" description="Native controls, restyled to match the system.">
          <div className="grid gap-5 rounded-xl border border-border bg-surface p-6 shadow-card sm:grid-cols-2">
            <FormField label="Faculty" htmlFor="f-faculty">
              <Select id="f-faculty" defaultValue="">
                <option value="" disabled>
                  Select a faculty…
                </option>
                <option>Engineering</option>
                <option>Education</option>
                <option>Medicine</option>
                <option>Humanities</option>
                <option>Science</option>
              </Select>
            </FormField>
            <FormField label="Search" htmlFor="f-search" hint="Trailing icon variant">
              <Input id="f-search" type="search" placeholder="Search courses" rightIcon={<Search />} />
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Course description" htmlFor="f-desc" hint="Shown on the course landing page">
                <Textarea
                  id="f-desc"
                  placeholder="Describe what learners will achieve…"
                  defaultValue="A practical, hands-on introduction to designing engaging digital courses."
                />
              </FormField>
            </div>
          </div>
        </Section>

        <Section title="Selection controls" description="Checkboxes, radios, and switches with descriptions.">
          <div className="grid gap-6 rounded-xl border border-border bg-surface p-6 shadow-card lg:grid-cols-3">
            <div>
              <p className="mb-3 text-sm font-medium text-text">Notifications</p>
              <div className="space-y-3">
                <Checkbox id="c1" defaultChecked label="Email digest" description="Weekly summary" />
                <Checkbox id="c2" defaultChecked label="Course updates" />
                <Checkbox id="c3" label="Marketing" description="Product news & offers" />
                <Checkbox id="c4" disabled label="SMS alerts" description="Unavailable in your region" />
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-text">Course level</p>
              <RadioGroup>
                <Radio id="r1" name="level" defaultChecked label="Beginner" />
                <Radio id="r2" name="level" label="Intermediate" />
                <Radio id="r3" name="level" label="Advanced" />
                <Radio id="r4" name="level" disabled label="Expert (soon)" />
              </RadioGroup>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-text">Preferences</p>
              <div className="space-y-4">
                <Toggle defaultChecked label="Auto-publish" description="Release on completion" />
                <Toggle label="Public catalog" description="List course publicly" />
                <Toggle disabled label="Beta features" description="Coming soon" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Validation states" description="Default, error, and disabled — plus a live email check.">
          <div className="grid gap-5 rounded-xl border border-border bg-surface p-6 shadow-card sm:grid-cols-2">
            <FormField label="Default" htmlFor="v1" hint="Focus to see the ring">
              <Input id="v1" placeholder="Everything looks good" />
            </FormField>
            <FormField label="Disabled" htmlFor="v2">
              <Input id="v2" value="Read-only value" disabled readOnly />
            </FormField>
            <FormField label="Error" htmlFor="v3" error="This username is already taken">
              <Input id="v3" defaultValue="jane.cooper" invalid />
            </FormField>
            <FormField
              label="Live email validation"
              htmlFor="v4"
              error={invalid ? "Enter a valid email address" : undefined}
              hint={!invalid ? "Type an email, then blur the field" : undefined}
            >
              <Input
                id="v4"
                type="email"
                placeholder="you@example.com"
                value={email}
                invalid={invalid}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                leftIcon={<Mail />}
              />
            </FormField>
          </div>
        </Section>

        {/* Composed example */}
        <Section title="Composed form" description="A complete, submit-ready form built from the primitives.">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto max-w-lg rounded-xl border border-border bg-surface p-6 shadow-card"
          >
            <h3 className="text-lg font-semibold text-text">Create a course</h3>
            <p className="mt-1 text-sm text-text-muted">Fill in the details to publish a new course.</p>
            <div className="mt-5 space-y-5">
              <FormField label="Course title" htmlFor="cf-title" required>
                <Input id="cf-title" placeholder="e.g. Designing Digital Learning" />
              </FormField>
              <FormField label="Category" htmlFor="cf-cat" required>
                <Select id="cf-cat" defaultValue="Pedagogy">
                  <option>Pedagogy</option>
                  <option>Innovation</option>
                  <option>Data</option>
                </Select>
              </FormField>
              <Checkbox id="cf-terms" label="I agree to the content guidelines" />
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline">
                  Save draft
                </Button>
                <Button type="submit">Publish course</Button>
              </div>
            </div>
          </form>
        </Section>
      </div>
    </div>
  );
}
