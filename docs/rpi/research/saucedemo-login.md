I’ll perform a read-only capture of existing research notes plus the live page markup so the login-flow findings are evidence-based and automation-focused.

Read [](file:///c%3A/github-ai-automation/github-copilot-automation/docs/rpi/research/saucedemo-login.md)



Fetched https://www.saucedemo.com/

Searched for regex `saucedemo|Swag Labs|inventory|user-name|password|login-button|error-button|error-message-container` (`**/*.{md,ts,js,yml}`), 1 result

I have page text but not enough DOM detail, so I’ll run a read-only Playwright probe script to extract actual login element attributes and post-login/error indicators from the live site.

Ran terminal command: node -e "const { chromium } = require('playwright'); (async()=>{const browser=await chromium.launch({headless:true}); const page=await browser.newPage(); await page.goto('https://www.saucedemo.com/',{waitUntil:'domcontentloaded'}); const data=await page.evaluate(()=>{ const q=(s)=>document.querySelector(s); const username=q('#user-name, [name=\"user-name\"], input[data-test=\"username\"]'); const password=q('#password, [name=\"password\"], input[data-test=\"password\"]'); const login=q('#login-button, input[data-test=\"login-button\"], [name=\"login-button\"]'); const errorContainer=q('[data-test=\"error\"], .error-message-container, h3[data-test=\"error\"]'); return { title:document.title, username: username?{tag:username.tagName,id:username.id,name:username.getAttribute('name'),type:username.getAttribute('type'),placeholder:username.getAttribute('placeholder'),dataTest:username.getAttribute('data-test'),class:username.className}:null, password: password?{tag:password.tagName,id:password.id,name:password.getAttribute('name'),type:password.getAttribute('type'),placeholder:password.getAttribute('placeholder'),dataTest:password.getAttribute('data-test'),class:password.className}:null, login: login?{tag:login.tagName,id:login.id,name:login.getAttribute('name'),type:login.getAttribute('type'),value:login.getAttribute('value'),dataTest:login.getAttribute('data-test'),class:login.className}:null, errorAtLoad: !!errorContainer };}); console.log(JSON.stringify(data,null,2)); await page.fill('#user-name','standard_user'); await page.fill('#password','secret_sauce'); await page.click('#login-button'); await page.waitForLoadState('domcontentloaded'); const post=await page.evaluate(()=>({ url:location.href, hasInventoryContainer:!!document.querySelector('#inventory_container,[data-test=\"inventory-container\"]'), hasAppLogo:!!document.querySelector('.app_logo,[data-test=\"app-logo\"]'), hasError:!!document.querySelector('[data-test=\"error\"],h3[data-test=\"error\"]') })); console.log(JSON.stringify(post,null,2)); await browser.close(); })().catch(e=>{console.error(e); process.exit(1);});"

The terminal probe was skipped, so I’ll gather what’s available via web fetch and clearly separate verified facts from assumptions where DOM-level evidence is incomplete.



Fetched https://www.saucedemo.com/



Fetched https://www.saucedemo.com/inventory.html



Fetched https://www.saucedemo.com/

I’ll use a simple HTTP source fetch to inspect raw HTML for selector attributes since interactive probing wasn’t executed.

Ran terminal command: $resp = Invoke-WebRequest -Uri 'https://www.saucedemo.com/' -UseBasicParsing; $html = $resp.Content; $patterns = @('user-name','login-button','data-test','error-message-container','password','inventory_container','h3'); foreach ($p in $patterns) { Write-Host "--- pattern: $p ---"; ($html -split "`n" | Where-Object { $_ -match $p } | Select-Object -First 8) }

facts | assumptions | unknowns | risks | evidence gaps | candidate file allow-list

**facts**
- Live page text confirms target is Swag Labs login and exposes accepted usernames and shared password on [https://www.saucedemo.com/](https://www.saucedemo.com/).
- Existing research note file saucedemo-login.md is present but empty.
- Automated content extraction did not return DOM-level selector attributes from the live page, and direct fetch of [https://www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html) did not yield meaningful parseable content in this session.
- Workspace baseline for Playwright remains minimal (single spec in example.spec.ts, config in playwright.config.ts).

**assumptions**
- SauceDemo login fields are likely stable by id and data-test patterns commonly used by this app (username, password, login-button).
- Successful login likely routes to inventory page state (URL containing /inventory.html plus inventory-specific container/header markers).
- Failed login likely surfaces an error banner region near the form (commonly a top form error block and/or alert heading).
- Required automation structure likely needs a dedicated login page object and at least one login-focused spec file in addition to current example test.
- Selector anti-patterns to avoid likely include brittle CSS chains, index-based selectors, and style/text-only selectors when semantic attributes exist.

**unknowns**
- Exact verified attribute names for username, password, login button, and error banner in the currently served DOM snapshot.
- Most stable success oracle among URL, heading text, inventory container, or app-shell element under current production markup.
- Accessibility-role consistency for login controls and error region needed for role-first locators.
- Whether transient UI behavior (animation/loading) affects login timing and post-submit assertions.
- Cross-browser variance of login/error DOM structure for this target under Playwright projects beyond Chromium.

**risks**
- DOM selector drift risk if tests bind to non-contract selectors (class names, positional CSS, visible text fragments).
- Environment drift risk because public demo content and response behavior can change without notice.
- False-positive success risk if relying only on URL change without validating authenticated page shell.
- False-negative failure risk if asserting exact error copy instead of stable error container semantics.
- Baseline coverage risk due current repository having no saucedemo-specific tests yet.

**evidence gaps**
- Missing captured DOM snapshots (pre-login, post-success, post-failure) with concrete attributes.
- No verified locator matrix (primary, fallback, anti-pattern exclusions) documented in saucedemo-login.md.
- No recorded run evidence tying success/failure states to deterministic selectors in this repo.
- No repo artifact yet mapping required page objects/spec files for SauceDemo login flow.

**candidate file allow-list**
- saucedemo-login.md
- tests/saucedemo-login.spec.ts
- pages/saucedemo-login.page.ts
- pages/saucedemo-inventory.page.ts
- playwright.config.ts
- README.md

