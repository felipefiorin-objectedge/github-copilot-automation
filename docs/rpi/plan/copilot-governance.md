GitHub Copilot: I’ll inspect the repository and tests to extract concrete facts about Playwright patterns, flakiness signals, and missing .github governance artifacts, then return the findings strictly in the format you requested. I’ll keep this research-only with no edits.

Created 6 todos

I’m running a quick read-only scan of top-level folders and key file patterns so we can ground the research in actual repository contents.

Read [](file:///c%3A/github-ai-automation/github-copilot-automation)

Searched for files matching `**/tests/**/*.ts`, 1 match

Searched for files matching `**/pages/**/*.ts`, no matches

Searched for files matching `**/.github/**`, 1 match

Quick progress: the repo includes .github, but only one workflow was found so far; there’s a single Playwright test file and no TypeScript page objects in pages. Next I’ll read playwright.config.ts, the test file, and key docs for usage patterns and risks.

Starting: *Inspect Playwright configuration* (2/6)

I’m now reading the core configuration and test artifacts to extract concrete locator, wait, and CI governance facts.

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/playwright.config.ts)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/tests/example.spec.ts)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/package.json)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/.github/workflows/playwright.yml)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/README.md)

I’ve confirmed the core Playwright setup and test patterns; next I’ll inspect rpi and .github contents to identify governance coverage and evidence gaps.

Searched for files matching `**/docs/rpi/**/*`, no matches

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/.github)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/.github/workflows)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/pages)

I found that .github contains only one workflow and pages is empty; I’ll quickly verify whether rpi folders are currently empty so we can mark documentation evidence gaps accurately.

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/implement)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/plan)

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/research)

Starting: *Synthesize requested output* (6/6)

I’m doing one final coverage check for additional Playwright tests or helper patterns so the findings aren’t biased by a single file.

Searched for files matching `**/*.{spec,test}.{ts,js,mts,cts}`, 1 match

Searched for regex `getByRole|getByText|getByTestId|locator\(|waitFor|waitForTimeout|toBeVisible|toHaveTitle` (`**/*.{ts,js}`), 4 results

Completed: *Synthesize requested output* (6/6)

facts | assumptions | unknowns | risks | evidence gaps | candidate file allow-list

**facts**
- Playwright is configured in playwright.config.ts with `fullyParallel: true`, CI retries `2`, CI workers `1`, HTML reporter, and trace on first retry.
- Test inventory appears minimal: one spec file example.spec.ts; search found no other `*.spec`/`*.test` files.
- Locator strategy currently uses accessibility-role locators (`getByRole`) in example.spec.ts; no `getByTestId` usage found.
- Waiting pattern is assertion-driven implicit waiting (`expect(...).toHaveTitle`, `toBeVisible`) in example.spec.ts; no explicit `waitForTimeout`/custom wait calls found.
- .github currently contains only one workflow file playwright.yml; no additional governance files were found under .github.
- package.json has no npm scripts defined; CI calls `npx playwright test` directly in workflow.

**assumptions**
- Repository is in a bootstrap/early stage because test coverage, docs, and page-object structure are sparse (empty pages and empty rpi).
- Current test (`playwright.dev`) functions as a scaffold/smoke example rather than product-specific QA coverage.

**unknowns**
- Target application URL/environment strategy (no `baseURL` enabled in playwright.config.ts).
- Intended governance standard (required PR checks, ownership model, review policy, Copilot policy scope).
- Flake history and failure modes (no historical run data or flaky test tracking artifacts present in repo).
- Whether test IDs are available in AUT DOM (cannot infer from current external-site example test).

**risks**
- External dependency risk: tests hit `https://playwright.dev/` (example.spec.ts), so availability/content drift can cause non-product-related failures.
- Parallelism drift risk: local runs are fully parallel while CI is single-worker (playwright.config.ts), which can mask concurrency issues until later scale-up.
- Coverage risk: single happy-path spec creates low defect-detection confidence.
- Governance risk: absence of .github policy/templates can lead to inconsistent PR quality and unclear Copilot usage boundaries.

**evidence gaps**
- No repo-specific QA policy or test strategy doc in README.md or rpi.
- No visible .github artifacts for ownership/policy/templates beyond CI workflow (from .github directory listing).
- No structured tagging/annotations for flaky tests, severity, or test categories found in current test files.

**candidate file allow-list**
- playwright.yml
- playwright.config.ts
- example.spec.ts
- package.json
- README.md
- research
- plan
- implement
- .github

User: You are in RPI Plan stage.

Use research from:
docs/rpi/research/copilot-governance.md

Create a plan including:

1) Scope statement
2) Root cause hypotheses (ranked by likelihood)
3) Exact files to create/update
4) File purpose and enforcement rules
5) Ordered implementation steps
6) Acceptance criteria
7) Rollback criteria
8) Validation commands
9) Residual risks

Constraints:
- Plan only
- No file content generation
- No code generation
- No modifications

GitHub Copilot: I’ll read the research note to anchor the plan on documented findings, then I’ll provide a structured implementation plan only (no edits, no code).

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/research/copilot-governance.md)

**1) Scope statement**
- Define repository-level Copilot governance and QA stabilization guardrails for Playwright test development and CI execution, based on findings in copilot-governance.md.
- In scope: policy files under .github, Playwright execution controls in playwright.config.ts, CI quality gates in playwright.yml, and operating guidance in README.md.
- Out of scope: test refactors, locator rewrites, new test creation, app-code changes, and any runtime architecture changes.

**2) Root cause hypotheses (ranked by likelihood)**
- High: Governance artifacts are missing/insufficient under .github, so PR quality and Copilot usage expectations are not consistently enforced.
- High: QA baseline is scaffold-level (single test in example.spec.ts), causing weak signal and unstable confidence.
- Medium: CI/local execution mismatch (parallel local vs serialized CI from playwright.config.ts) may hide or surface flake inconsistently.
- Medium: External target dependency (playwright.dev in example.spec.ts) introduces nondeterministic failures unrelated to product behavior.
- Medium-Low: No explicit repository scripts in package.json reduces standardized invocation and reproducibility.

**3) Exact files to create/update**
- Create: .github/CODEOWNERS
- Create: .github/pull_request_template.md
- Create: .github/ISSUE_TEMPLATE/flaky-test.yml
- Create: .github/ISSUE_TEMPLATE/qa-regression.yml
- Create: .github/copilot-instructions.md
- Update: playwright.yml
- Update: playwright.config.ts
- Update: package.json
- Update: README.md
- Create: docs/rpi/plan/copilot-governance-plan.md
- Create: docs/rpi/implement/copilot-governance-qa-checklist.md

**4) File purpose and enforcement rules**
- ​.github/CODEOWNERS: enforce mandatory reviewer ownership for workflow, config, and test directories.
- ​.github/pull_request_template.md: enforce PR declarations for locator strategy, waiting strategy, and flake-risk assessment.
- ​.github/ISSUE_TEMPLATE/flaky-test.yml: enforce structured flake triage fields (frequency, environment, retry behavior, trace evidence).
- ​.github/ISSUE_TEMPLATE/qa-regression.yml: enforce reproducibility and impact/severity metadata for QA regressions.
- ​.github/copilot-instructions.md: enforce repository-specific Copilot constraints for tests, selectors, waits, and CI-safe edits.
- ​.github/workflows/playwright.yml: enforce CI gates, artifact retention, and deterministic execution settings.
- playwright.config.ts: enforce canonical runtime policy (timeouts, retries policy, reporters, trace/video/screenshot strategy).
- package.json: enforce standardized command entry points for local and CI parity.
- README.md: enforce single source of truth for contributor operating procedure.
- docs/rpi/plan/copilot-governance-plan.md: enforce traceable plan-to-implementation mapping.
- docs/rpi/implement/copilot-governance-qa-checklist.md: enforce release readiness checklist for governance + QA controls.

**5) Ordered implementation steps**
- Baseline and freeze: confirm current state from copilot-governance.md.
- Add governance skeleton under .github (ownership, PR template, issue templates, Copilot instruction policy).
- Normalize execution policy in playwright.config.ts and command surface in package.json.
- Align CI enforcement in playwright.yml with local command contract.
- Document contributor workflow in README.md.
- Publish planning/implementation trace docs in docs/rpi/plan/copilot-governance-plan.md and docs/rpi/implement/copilot-governance-qa-checklist.md.
- Run validation commands and capture evidence for acceptance criteria.

**6) Acceptance criteria**
- All files listed in section 3 exist with approved governance scope and no policy conflicts.
- PRs touching tests/config/workflows are ownership-gated by CODEOWNERS.
- CI runs via standardized repository commands and publishes expected artifacts on failure.
- Contributor documentation clearly states Copilot boundaries, locator/wait expectations, and QA evidence requirements.
- Plan and implementation docs are linked and auditable from repository docs.

**7) Rollback criteria**
- Any governance change blocks routine contributor flow without clear remediation.
- CI false-fail rate materially increases after governance rollout.
- Ownership rules create unresolvable review bottlenecks.
- Policy ambiguity causes conflicting interpretation across maintainers.
- If triggered: revert governance-introducing changes first, retain research artifact unchanged, and reopen with narrower scope.

**8) Validation commands**
- `npm ci`
- `npx playwright --version`
- `npm run test:e2e` (after script standardization)
- `npm run test:e2e:ci` (after script standardization)
- `npx playwright test --list`
- `npx playwright test --reporter=html`
- `npx playwright show-report`
- `git ls-files .github`
- `git diff --name-only`

**9) Residual risks**
- Low test volume still limits confidence even with stronger governance.
- External-site dependency risk remains until product-targeted tests replace scaffold behavior.
- Governance overhead may slow early-stage iteration if thresholds are too strict.
- Flake diagnosis quality depends on consistent trace/artifact review discipline.
- Future contributor drift remains possible unless governance docs are maintained as living standards.

If you want, I can next convert this plan into an implementation-ready checklist matrix (owner, phase, exit criteria) in Plan stage format only.