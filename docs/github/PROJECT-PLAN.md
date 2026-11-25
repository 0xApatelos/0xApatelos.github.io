# Build evidence for IT Specialist & AI Enthusiast

These are proposed projects, not shipped work. No repositories have been created
for them. Prioritize evidence and reproducibility over repository count.

## 1. IT Support Homelab — start here

**Goal:** demonstrate a systematic troubleshooting process.

**Minimum useful version**

- One Linux VM and an optional Windows client, using local virtualization.
- A network diagram showing clients, addresses, services, and boundaries.
- Five scenarios: DNS failure, full disk, stopped service, file permissions,
  and connectivity failure.
- For each: symptoms → hypothesis → commands → finding → fix → verification.
- A setup guide, screenshots from the actual lab, and reset instructions.

**Evidence checklist**

- A second person can reproduce the lab using the README.
- Each incident shows a failing check followed by a passing check.
- Screenshots and logs redact personal information and credentials.
- No vulnerable lab service is exposed publicly.

**Suggested structure**

```text
README.md
architecture/network.svg
setup/
runbooks/
incidents/
evidence/
```

## 2. System Health Monitor — build on the lab

**Goal:** turn repeated checks into testable automation.

**Minimum useful version**

- Python CLI checking disk usage, DNS, TCP connectivity, and an HTTP endpoint.
- Configurable thresholds and timeouts, human-readable and JSON output.
- Exit statuses for healthy/unhealthy/error; no root privileges by default.
- Tests with mocked network/disk responses, including timeouts and invalid config.
- Synthetic example logs and an optional local scheduled task.

**Evidence checklist**

- Show passing automated tests and a real local failure/recovery demonstration.
- Document the supported operating system and exact installation steps.
- Report measured check durations only after recording how they were measured.
- Avoid real credentials in config; provide an `.env.example` if needed.

## 3. AI Helpdesk Assistant — connect AI to the same domain

**Goal:** answer questions from the lab runbooks, with sources and clear limits.

**Minimum useful version**

- Index your own synthetic IT documentation, not private helpdesk tickets.
- Return source citations for each answer.
- Explicitly decline questions unsupported by the documents.
- Treat retrieved text as untrusted input; do not execute suggested commands.
- Include a small evaluation set covering answerable, unanswerable, ambiguous,
  and prompt-injection questions.
- Keep API keys on a backend or in a local environment, never in frontend code.

**Evidence checklist**

- Document the model/version, retrieval settings, dataset size, and evaluation method.
- Publish actual sample outputs, citation correctness checks, and observed failures.
- Measure latency and cost on a stated sample instead of inventing accuracy claims.
- Provide synthetic demo mode or clear instructions if a paid API is required.

## Definition of ready to pin

A featured project should answer these questions in under a minute:

1. What problem does it solve?
2. What part did you build?
3. How do I run it?
4. Where is the demo or screenshot?
5. What tests or evaluation support the claims?
6. What does it not do yet?

Once a project meets that bar, add it to the profile's selected-project table.
