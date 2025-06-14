"use client";

import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FilterData = {
  [subject: string]: {
    [chapter: string]: string[];
  };
};

type HierarchicalFilterProps = {
  filterData: FilterData;
  filter: {
    subject: string;
    chapter: string;
    topic: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      subject: string;
      chapter: string;
      topic: string;
    }>
  >;
};

export default function HierarchicalFilter({
  filterData,
  filter,
  setFilter,
}: HierarchicalFilterProps) {
  const { subject, chapter, topic } = filter;

  const subjectOptions = Object.keys(filterData).map((s) => ({
    value: s,
    label: s,
  }));

  const chapterOptions =
    subject && filterData[subject]
      ? Object.keys(filterData[subject]).map((c) => ({
          value: c,
          label: c,
        }))
      : [];

  const topicOptions =
    subject && chapter && filterData[subject][chapter]
      ? filterData[subject][chapter].map((t) => ({
          value: t,
          label: t,
        }))
      : [];

  const updateFilter = (
    key: "subject" | "chapter" | "topic",
    value: string
  ) => {
    setFilter((prev) => {
      const updated = { ...prev, [key]: value };

      // Clear dependent filters
      if (key === "subject") {
        updated.chapter = "";
        updated.topic = "";
      } else if (key === "chapter") {
        updated.topic = "";
      }

      return updated;
    });
  };

  const clearFilter = (key: "subject" | "chapter" | "topic") => {
    setFilter((prev) => {
      const updated = { ...prev, [key]: "" };

      // Clear dependent filters
      if (key === "subject") {
        updated.chapter = "";
        updated.topic = "";
      } else if (key === "chapter") {
        updated.topic = "";
      }

      return updated;
    });
  };

  return (
    <div className="w-full grid grid-cols-3 gap-4 mb-10">
      {/* Subject */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label>Subject</Label>
          {subject && (
            <Button
              variant="link"
              className="h-auto p-0 text-sm underline"
              onClick={() => clearFilter("subject")}
            >
              Clear
            </Button>
          )}
        </div>
        <Combobox
          options={subjectOptions}
          value={subject}
          onChange={(val) => updateFilter("subject", val)}
          placeholder="Select subject"
        />
      </div>

      {/* Chapter */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label>Chapter</Label>
          {chapter && (
            <Button
              variant="link"
              className="h-auto p-0 text-sm underline"
              onClick={() => clearFilter("chapter")}
            >
              Clear
            </Button>
          )}
        </div>
        <Combobox
          options={chapterOptions}
          value={chapter}
          onChange={(val) => updateFilter("chapter", val)}
          placeholder="Select chapter"
          disabled={!subject}
        />
      </div>

      {/* Topic */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label>Topic</Label>
          {topic && (
            <Button
              variant="link"
              className="h-auto p-0 text-sm underline"
              onClick={() => clearFilter("topic")}
            >
              Clear
            </Button>
          )}
        </div>
        <Combobox
          options={topicOptions}
          value={topic}
          onChange={(val) => updateFilter("topic", val)}
          placeholder="Select topic"
          disabled={!chapter}
        />
      </div>
    </div>
  );
}
