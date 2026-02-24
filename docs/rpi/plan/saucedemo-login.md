I’ll read the specified research file first and then build the 10-part plan strictly from that evidence, flagging any gaps where the file is incomplete.

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/research/saucedemo-login.md)

**1) Scope Statement**
- Plan Playwright automation for SauceDemo login at [https://www.saucedemo.com/](https://www.saucedemo.com/) using the current research in saucedemo-login.md.
- Cover only login-path automation design: locators, assertions, file structure, validation, and rollback guardrails.
- Exclude implementation, refactoring, and non-login feature coverage.

**2) Root-Cause Risk Analysis**
- High: DOM evidence is incomplete in current research, so selector choices may be based on assumptions rather than verified attributes.
- High: Public demo environment may change independently, causing unstable outcomes unrelated to repo changes.
- Medium: Current repo has minimal Playwright surface, so new login flow could lack baseline conventions.
- Medium: Success/failure oracles may be ambiguous if only one signal is used (for example URL-only).

**3) File Impact Matrix**
- saucedemo-login.md: source of truth for verified selectors and observed states.
- saucedemo-login.md: plan artifact with execution order and acceptance gates.
- tests/saucedemo-login.spec.ts: login success/failure test scenarios.
- pages/saucedemo-login.page.ts: encapsulates login form interactions and login error surface.
- pages/saucedemo-inventory.page.ts: encapsulates post-login success-state checks.
- playwright.config.ts: test project/runtime behavior used for login suite execution.
- README.md: contributor run instructions and scope note for SauceDemo login tests.

**4) Locator Strategy**
- Priority order: stable semantic attributes (id/name/data-test) → role/name locators → minimal fallback selectors.
- Define primary and fallback locator per control (username, password, login button, error banner), with one canonical selector per page object method.
- Treat class chains, nth-child selectors, and style-driven selectors as anti-patterns unless no stable alternative exists.
- Require explicit mapping of selector confidence (verified vs assumed) in research before implementation.

**5) Assertion Strategy**
- Success condition should be multi-signal: navigation outcome plus authenticated-page marker.
- Failure condition should assert error container presence and stable error semantics, not only exact copy text.
- Assertions should avoid timing assumptions; rely on Playwright’s built-in waiting via expect-based checks.
- Capture separate oracle sets for success and failure to reduce false positives/negatives.

**6) Ordered Implementation Steps**
- 1. Normalize research evidence in saucedemo-login.md into verified vs assumed selector/state tables.
- 2. Finalize locator matrix and assertion oracle matrix in saucedemo-login.md.
- 3. Define page-object boundaries for login and inventory responsibilities.
- 4. Define test scenarios for positive login and negative login/error banner.
- 5. Define validation sequence (local deterministic run, repeated run, CI run parity).
- 6. Define rollback trigger thresholds and reversion scope before implementation starts.

**7) Acceptance Criteria**
- Plan identifies explicit selectors for username, password, login button, success marker, and error banner with confidence labels.
- Success and failure each have at least one primary and one fallback assertion oracle.
- File ownership and responsibilities are unambiguous across test file and page objects.
- Validation commands and pass/fail interpretation are documented in the plan artifact.
- Residual risks and evidence gaps are listed and traceable to research evidence.

**8) Rollback Criteria**
- Verified selectors fail repeatedly due to DOM drift with no deterministic fallback path.
- Success/failure assertions produce unstable outcomes across repeated runs.
- CI behavior diverges from local behavior beyond defined tolerance.
- Rollback scope: suspend SauceDemo login automation rollout and revert only login-flow automation additions while preserving research/plan documents.

**9) Validation Commands**
- `npm ci`
- `npx playwright install --with-deps`
- `npx playwright test tests/saucedemo-login.spec.ts`
- `npx playwright test tests/saucedemo-login.spec.ts --repeat-each=10`
- `npx playwright show-report`

**10) Residual Risks**
- Selector certainty remains limited until DOM-level evidence is captured reliably.
- Third-party demo environment changes may continue to introduce non-product flakiness.
- Cross-browser differences may surface after initial Chromium-focused validation.
- Minimal repository baseline means conventions may evolve while implementing this plan.

If you want, I can next convert this into a concise execution checklist format for saucedemo-login.md (still plan-only, no edits).