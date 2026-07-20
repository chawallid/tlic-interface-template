"use client";

import { colorFamilies, semanticTokens, tokensToCss } from "@/lib/design-tokens";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section, Token } from "@/components/showcase/Section";
import { ColorScaleRow } from "@/components/showcase/ColorSwatch";
import { CopyButton } from "@/components/showcase/CopyButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

const badgeTones = ["primary", "secondary", "accent", "success", "warning", "error"] as const;

export default function ColorsPage() {
  return (
    <div>
      <PageHeader
        titleKey="page.colors.title"
        descKey="page.colors.desc"
        actions={<CopyButton value={tokensToCss()} label="Copy all as CSS" size="sm" />}
      />

      <div className="space-y-12">
        <Section
          title="Brand palettes"
          description="Every step maps to a Tailwind utility, e.g. bg-primary-500. Click a swatch to copy its token."
        >
          <div className="space-y-4">
            {colorFamilies.map((family) => (
              <ColorScaleRow key={family.key} family={family} />
            ))}
          </div>
        </Section>

        <Section
          title="Semantic tokens"
          description="Theme-aware variables that remap automatically between light and dark mode."
        >
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>CSS variable</TableHead>
                  <TableHead>Light</TableHead>
                  <TableHead>Dark</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semanticTokens.map((tk) => (
                  <TableRow key={tk.token}>
                    <TableCell>
                      <Token>{tk.token}</Token>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-muted">{tk.css}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-5 rounded-md border border-border"
                          style={{ backgroundColor: tk.light }}
                        />
                        <span className="font-mono text-xs text-text-muted">{tk.light}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-5 rounded-md border border-border"
                          style={{ backgroundColor: tk.dark }}
                        />
                        <span className="font-mono text-xs text-text-muted">{tk.dark}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-text-muted">{tk.usage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        <Section
          title="Color in context"
          description="How the palette reads across the components it drives."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <p className="mb-4 text-sm font-medium text-text-muted">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
              <p className="mb-4 mt-8 text-sm font-medium text-text-muted">Badges</p>
              <div className="flex flex-wrap gap-2">
                {badgeTones.map((tone) => (
                  <Badge key={tone} tone={tone} className="capitalize">
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Alert variant="info" title="Information">
                Neutral, on-brand blue keeps informational messages calm.
              </Alert>
              <Alert variant="success" title="Success">
                The green from the “I” signals positive outcomes.
              </Alert>
              <Alert variant="warning" title="Warning">
                Amber is reserved for cautionary, reversible states.
              </Alert>
              <Alert variant="error" title="Error">
                The crimson from the “C” marks failures and destructive actions.
              </Alert>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
