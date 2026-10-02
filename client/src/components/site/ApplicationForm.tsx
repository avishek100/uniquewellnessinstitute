import { apiClient } from "@/lib/api";
import { saveVisitorChatSession } from "@/lib/visitor-chat";
import { Clock, GraduationCap, Lock, ShieldCheck, Sparkles } from "lucide-react";
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
      const response = await apiClient.request("/api/applications", {
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
      <form className="card-soft relative overflow-hidden p-6 sm:p-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 text-primary shadow-2xs">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Submit Application</h3>
            <p className="text-xs text-muted-foreground">
              Book your free interactive demo class today
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Student Type</span>
            <div className="mt-2 inline-flex rounded-full border border-border bg-muted/80 p-1 shadow-inner">
              {(["child", "adult"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setStudentType(type)}
                  className={`rounded-full px-5 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${studentType === type
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {type === "child" ? "Junior (5–16)" : "Adult / Pro"}
                </button>
              ))}
            </div>
          </div>

          {studentType === "child" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Child&apos;s full name
                <input className="field" name="childName" placeholder="e.g. Aarav Sharma" required />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Child&apos;s age
                <select className="field" name="childAge" defaultValue="" required>
                  <option value="" disabled>
                    Select age
                  </option>
                  {ages.map((age) => (
                    <option key={age} value={age}>
                      {age} years old
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                You are
                <select className="field" name="relation" defaultValue="" required>
                  <option value="" disabled>
                    Select relationship
                  </option>
                  {relations.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Your name (Parent/Guardian)
                <input className="field" name="parentName" placeholder="e.g. Priya Sharma" required />
              </label>
            </div>
          )}

          {studentType === "adult" && (
            <label className="grid gap-1.5 text-sm font-medium">
              Your name
              <input className="field" name="name" placeholder="Full name" required />
            </label>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Phone number (WhatsApp)
              <input className="field" name="phone" type="tel" placeholder="+91 98765 43210" required />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Email address
              <input
                className="field"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium">
            Additional notes (Optional)
            <textarea
              className="field min-h-20"
              name="message"
              placeholder="Any prior chess experience or preferred batch timings?"
            />
          </label>

          <button type="submit" className="btn-primary mt-2 w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? "Submitting application..." : "Submit Application for Free Demo"}
          </button>
          
          <div className="mt-1 flex items-center justify-center gap-4 text-center text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-primary" /> Free Demo Class
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-primary" /> Fast Contact
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="size-3.5 text-primary" /> 100% Confidential
            </span>
          </div>
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
