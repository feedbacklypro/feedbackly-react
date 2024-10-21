import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { ChevronRight, MessageSquare, Bug, Lightbulb } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface FeedbacklyWidgetProps {
  trigger: React.ReactNode;
}

type FeedbackType = "feature" | "bug" | "feedback" | null;

const feedbackOptions = [
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "feedback", label: "General Feedback", icon: MessageSquare },
];

export function FeedbacklyWidget({ trigger }: FeedbacklyWidgetProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Form submitted:", Object.fromEntries(formData));
    setOpen(false);
    setFeedbackType(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Help us improve our product by sharing your thoughts.
          </DialogDescription>
        </DialogHeader>
        {!feedbackType ? (
          <div className="py-6">
            <h4 className="mb-4 text-sm font-medium">
              What would you like to report?
            </h4>
            <div className="space-y-2">
              {feedbackOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setFeedbackType(option.value as FeedbackType)}
                >
                  <div className="flex items-center">
                    <option.icon className="mr-2 h-4 w-4" />
                    {option.label}
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide more details..."
                required
              />
            </div>
            {feedbackType === "bug" && (
              <div className="space-y-2">
                <Label htmlFor="steps">Steps to Reproduce</Label>
                <Textarea
                  id="steps"
                  name="steps"
                  placeholder="1. Go to...
2. Click on...
3. Observe that..."
                />
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setFeedbackType(null)}
              >
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
