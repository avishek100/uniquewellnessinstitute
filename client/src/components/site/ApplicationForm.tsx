import { apiUrl } from "@/lib/api-url";
import { saveVisitorChatSession } from "@/lib/visitor-chat";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { ApplicationChat } from "./ApplicationChat";

const relations = [
  "Mother",
  "Father",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Auntie",
  "Brother",
  "Sister",
  "Other",
];

const ages = Array.from({ length: 14 }, (_, i) => i + 3);

export function ApplicationForm() {
  const [studentType, setStudentType] = useState<"adult" | "child">("child");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversation, setConversation] = useState<{
    id: string;
    token: string;
    visitorName: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, studentType }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        conversationId?: string;
        chatToken?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Could not submit the application.");
      }

      toast.success("Application received", {
        description: "Our specialist will contact you shortly.",
      });
      const name = String(payload.parentName ?? payload.name ?? payload.childName ?? "Applicant");
      if (result.conversationId && result.chatToken) {
        saveVisitorChatSession({
          conversationId: result.conversationId,
          chatToken: result.chatToken,
          visitorName: name,
        });
        setConversation({ id: result.conversationId, token: result.chatToken, visitorName: name });
      }
      form.reset();
      setStudentType("child");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit the application.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="card-soft p-6 sm:p-8" onSubmit={handleSubmit}>
        <h3 className="text-2xl">Submit application</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us a little about the student and we will arrange a demo class.
        </p>

        <div className="mt-6 grid gap-4">
          <div>
            <span className="text-sm font-medium">Student</span>
            <div className="mt-2 inline-flex rounded-full border border-border bg-muted p-1">
              {(["adult", "child"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setStudentType(type)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${studentType === type
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {studentType === "child" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Child&apos;s full name
                <input className="field" name="childName" placeholder="Full name" required />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Child&apos;s age
                <select className="field" name="childAge" defaultValue="" required>
                  <option value="" disabled>
                    Select age
                  </option>
                  {ages.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                You are
                <select className="field" name="relation" defaultValue="" required>
                  <option value="" disabled>
                    Select
                  </option>
                  {relations.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Your name
                <input className="field" name="parentName" placeholder="Your name" required />
              </label>
            </div>
          )}

          {studentType === "adult" && (
            <label className="grid gap-1.5 text-sm font-medium">
              Your name
              <input className="field" name="name" placeholder="Your name" required />
            </label>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Phone number
              <input className="field" name="phone" type="tel" placeholder="+91 ..." required />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <input
                className="field"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium">
            Message
            <textarea
              className="field min-h-24"
              name="message"
              placeholder="Anything we should know?"
            />
          </label>

          <button type="submit" className="btn-primary mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit application to school"}
          </button>
          <p className="text-xs text-muted-foreground">
            By submitting the form you consent to the processing of your personal data.
          </p>
        </div>
      </form>
      {conversation && (
        <div className="lg:col-span-2">
          <ApplicationChat
            conversationId={conversation.id}
            chatToken={conversation.token}
            visitorName={conversation.visitorName}
            mode="visitor"
          />
        </div>
      )}
    </>
  );
}
