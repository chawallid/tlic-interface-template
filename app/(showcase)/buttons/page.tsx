"use client";

import { useState } from "react";
import { Plus, Download, ArrowRight, Trash2, Heart, Settings, Search, Bell } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section, Preview } from "@/components/showcase/Section";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div>
      <PageHeader titleKey="page.buttons.title" descKey="page.buttons.desc" />

      <div className="space-y-12">
        <Section title="Variants" description="Six intents, each mapped to a brand color role.">
          <Preview>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </Preview>
        </Section>

        <Section title="Sizes" description="Small, medium, and large — with matching icon and text scale.">
          <Preview>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Preview>
        </Section>

        <Section title="With icons" description="Add leading or trailing icons; icons auto-size to the button.">
          <Preview>
            <div className="flex flex-wrap items-center gap-3">
              <Button leftIcon={<Plus />}>New course</Button>
              <Button variant="outline" rightIcon={<ArrowRight />}>
                Continue
              </Button>
              <Button variant="secondary" leftIcon={<Download />}>
                Export
              </Button>
              <Button variant="ghost" leftIcon={<Settings />}>
                Settings
              </Button>
            </div>
          </Preview>
        </Section>

        <Section title="States" description="Disabled and loading states are handled for you.">
          <Preview>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <Button loading>Saving</Button>
              <Button variant="primary" loading={loading} onClick={simulate}>
                {loading ? "Processing…" : "Click to load"}
              </Button>
            </div>
          </Preview>
        </Section>

        <Section title="Icon buttons" description="Square, icon-only actions — always with an aria-label.">
          <Preview>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton aria-label="Search" icon={<Search />} variant="outline" />
              <IconButton aria-label="Notifications" icon={<Bell />} variant="ghost" />
              <IconButton aria-label="Like" icon={<Heart />} variant="primary" />
              <IconButton aria-label="Delete" icon={<Trash2 />} variant="danger" />
              <IconButton aria-label="Settings" icon={<Settings />} variant="secondary" size="sm" />
              <IconButton aria-label="Add" icon={<Plus />} variant="outline" size="lg" />
            </div>
          </Preview>
        </Section>

        <Section title="Full width" description="Stretches to fill its container — useful in forms and cards.">
          <Preview className="max-w-sm">
            <div className="space-y-3">
              <Button fullWidth leftIcon={<Plus />}>
                Create new course
              </Button>
              <Button fullWidth variant="outline">
                Cancel
              </Button>
            </div>
          </Preview>
        </Section>
      </div>
    </div>
  );
}
