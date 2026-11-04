# Power Platform Community Conference 2026 Notes

Oct 27, 2026 · @Anthony

## Summary

Notes from the keynote and seven sessions; one session is from the
slides only.

**Key themes**

  - **GCC availability is the gating question.** Most major
    announcements need a GCC timeline before we can plan around them:
    the new Copilot Studio harness, workflows, the Copilot managed
    runtime, Security Hub, advanced connector policies, Cowork, and
    plug-in managed identity.

  - **Domain knowledge comes first.** The keynote and the Engineer Up
    session both stressed that context drives good solutions. When we
    build for customers, we should understand their domain knowledge
    before the app spec.

  - **Agentic development moves the bottleneck to review and
    governance.** More apps are being built than can be reviewed, so
    Microsoft is investing in Git-backed ALM, deployment approvals, and
    Monitor.

  - **Copilot Studio is moving to the GitHub Copilot harness.**
    Re-architect agents rather than port them; use workflows when the
    path is predictable and agents when it isn't.

  - **Governance and security are consolidating** around Security Hub,
    advanced connector policies (replacing DLP), tenant isolation, VNet,
    and managed identity.

**Most relevant to our CMS work**

  - The Copilot managed runtime defaults to personal environments, and
    we don't provision developer environments today. We'll need a plan
    for environment routing.

  - We're already moving to pipelines with service principal
    deployments. Deployment approvals and Monitor would build on that.

  - We keep getting requests that fit workflows, so we need to decide
    whether to wait for GCC or build in the legacy harness.

  - Plans is available in GCC but uses non-FedRAMP-approved sources, and
    it's a citizen developer tool, not a production one.

## Keynote

The keynote's message: a faster core platform, and domain experts
building their own solutions with Work IQ in Power Platform Copilot.

**Performance on the existing platform**

  - Lots of performance improvements to what's already in place, not
    just new features.

**Empowering domain experts**

  - Focus on enabling people inside an organization who hold the domain
    knowledge.

  - Goal: let them build custom solutions themselves.

  - Outcome: decisions are better informed and the work is easier to
    manage.

Domain knowledge is the emphasis: users build apps and automations from
what they know first, with the platform following that knowledge.

**Work IQ in Power Platform Copilot**

  - Work IQ is the piece that enables these makers inside Copilot.

**New Copilot Studio harness**

  - Better performance across all types of tasks.

  - Also more token efficient.

  - GCC: need to know when we get access.

**Agent accounts**

  - Agents get their own accounts and act as themselves.

  - Each has an email address and can be chatted with in Teams.

  - Can be @mentioned, pulled into a meeting, and add comments in a
    document.

**No cliffs between no code and low code**

  - There used to be a trade-off between no code and low code; that
    cliff is gone.

  - No code has truly taken off, but because agents are writing the
    code.

  - Power Automate flows can be worked on with GitHub Copilot in VS
    Code.

  - A flow's solution definition is just JSON, so you can prompt to
    explain it, update it, or diagnose issues without leaving VS Code.

**Copilot managed runtime**

  - A fully managed platform with governance controls.

  - Covers DLP, oversight, and security.

**Admin center**

  - The primary place to manage and control maker policies, covering
    both agents and managed apps.

  - Data source controls.

  - Cost management.

## Sessions

In the order attended. The last session is from the slides only.

### Managed Operations: Build, Deploy, and Operate at Enterprise Scale

First session of the day. Topic: DevOps in Power Platform.

**The problem**

  - Agentic development has increased the number of apps and solutions,
    but PR and code review capacity hasn't kept up.

  - Goal: give humans and agents the right tools through Power Platform
    ALM and the Copilot managed runtime.

**Power Platform ALM tools**

  - Pipelines.

  - Native Git integration, with GitHub support just announced.

  - Monitor.

**Case study: 4 people managing 50 projects**

  - ALM support combined with agentic development.

  - Heavy use of GitHub, including security review.

  - Playwright automation previews and runs the app, and builds training
    material alongside release videos.

  - Demo of an automated release video built with an AI tool.

  - Their flow from code change to release: agents assist with dev,
    testing, and review, and engineers approve. Release automation
    publishes the code app, and the deployment drafts release notes,
    training videos, and SharePoint pages for an owner to review.
    Application Insights monitors the app, and an agent can summarize
    findings or propose a fix that goes back through review.

  - Foundation: source control, gated deployments, human approval,
    shared telemetry.

**Copilot managed runtime**

  - A brand-new entry point; shows up in Cowork and Code within Copilot.

  - Start with any tool: Copilot Studio, Copilot Cowork, Copilot Code,
    VS Code, the GitHub Copilot app, Lovable, Claude, or other
    third-party tools.

  - Build with the runtime SDK, host on the managed runtime host with no
    infrastructure to manage, and govern with IT visibility over
    enterprise-deployed managed artifacts.

  - Benefits: fewer decisions, less to learn, less to set up, controlled
    releases.

  - Git is built into the runtime, whether you use GitHub, ADO, or
    neither.

**Big shifts from traditional ALM**

| Traditional Power Platform ALM                       | Copilot managed runtime ALM                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| Pick an environment or use the shared Default        | Defaults to individual personal environments                        |
| Dataverse solutions with layers and dependencies     | Always backed by a Git repo; no Dataverse needed for ALM            |
| Configure pipelines, then add Git and testing        | Repo and build/deploy wired together; bring your own tools optional |
| Move solutions across Dev / Test / Prod environments | Deploy commits through stages; preview, then go live with approvals |

  - Supports single and multiple deployments; a personal environment can
    host prod.

  - Environments remain governance boundaries; configuration lives in
    the project with stage overrides.

**Projects (public preview ETA: end of November)**

  - A project is one repo that builds and deploys as a unit.

  - One directory per component, each with its own config file:
    ms.project.config.json at the root, ms.config.json per app.

  - Apps are still listed on their own; makers and end users don't need
    to think about projects.

  - Parts of a config file can be overridden for a specific deployment.

  - Apps only for now; they plan to add agents, data, and other objects
    later.

**Three deployment patterns**

They expect most apps never to leave the environment they were built in.

  - \~80%: dev, test, and prod stages in the maker's personal
    environment. No need to deploy elsewhere if it fits the personal
    environment's governance limits.

  - \~15%: all three stages in a shared team environment with its own
    policy.

  - \~5%: multi-environment ALM, with prod in its own environment for
    governance controls that need that boundary (public preview ETA: end
    of year).

**Every project has a Git repo (public preview)**

  - Out-of-the-box repos are the default: everything is
    version-controlled in a remote Git repo you can clone locally.
    Source code is the source of truth, not solutions or a Dataverse
    database.

  - GitHub Enterprise native integration: optionally host code in your
    own GitHub repos, automatically wired into the build-and-deploy
    pipeline (via the Microsoft Managed Apps GitHub App).

  - Bring your own: manage the end-to-end build and deployment with your
    own Git system. Supports service principal auth for autonomous
    workflows.

**Approvals (coming soon to the managed runtime)**

  - Roles: project owner, contributor or agent, and approver.

  - Approve through the CLI or an in-product experience. The demo showed
    a "Deployment approval required" email linking to a page with the
    deployment details.

  - Works with agentic tools through skills, so GitHub Copilot or Claude
    Code can help manage approvals and deployments.

  - Service principals are supported.

**Monitor**

  - The problem: once everything is deployed, how do you get insights?

  - Monitor events now refresh every hour instead of every 24 hours. Set
    in the M365 admin center and Power Platform admin center under data
    review period.

  - Monitor can send webhooks through the Power Platform admin v2
    connector, so alerts can route anywhere. More flexible than email
    notifications.

  - Monitor data is kept for 30 days; schedule exports via PAC CLI in
    OpenTelemetry format.

  - Power Pages site health is improving.

**Final demo: agent loop that fixes issues**

  - An alert webhook fires and creates a GitHub issue.

  - GitHub Actions start agents that look at the issue and the commit or
    operation behind the alert, then suggest and deploy a fix.

  - The actions run a series of tests to make sure the issue doesn't get
    worse, then deploy the latest changes.

**How this applies to my work**

  - Copilot managed runtime availability is the core question: is it
    even in our environment?

  - Most apps built with Copilot, in code or by prompting, will live in
    personal environments and be shared with others. As apps become
    mission-critical, add a test environment for feature updates and a
    prod environment for apps with a large user base.

  - The runtime fills the gaps in how we do things today and moves away
    from traditional ALM toward something easier to manage.

  - At work we use code apps stored in GitHub, and I build a Power
    Platform config file that details the environment requirements and
    datasets involved. Keep that in mind against the new project config
    files.

  - We don't use deployment approvals today. We have a go/no-go process
    for MVP deployments, then TAs push updates through pipelines. We're
    migrating everyone to the pipelines host and deployments through a
    service principal.

  - Need to learn Monitor in our GCC tenant.

### The New AI Development Cycle for Power Platform

Hosted by Engineer Up (Ben Freedman, Mike Hughes, Jared Simmons). Not a
technical deep dive. Companion whitepaper: *Build at the Speed of AI:
The New Power Platform Development Cycle*.

**Core idea: it's all about context**

  - Building with AI is all about context. You aren't building the tool;
    you're building a solution.

  - Train a second brain that holds the project's business, technical,
    and people context.

  - Be focused and selective with context. Accumulation is not
    knowledge.

**The 7 topics**

1.  Discovery: gather context on scope, integrations, and key
    stakeholders to reach a shared understanding sooner.

2.  Estimation and planning: build the features, have AI draft the
    stories, and have a person review every one.

3.  Backlog: meet the customer where they are.

4.  Development: your operating model matters because it spells out how
    you work. Measure, don't guess.

5.  Testing: tests that prove the work is done. Audit the AI's tests.
    Point AI at integration and end-to-end tests, not unit tests.

6.  Deployment and ALM: keep the pipeline deterministic; AI helps with
    what people read, like release notes tied to stories (from the
    whitepaper).

7.  Best practices: tune the efficiency number and use the right model
    for the job.

**The efficiency number**

  - (AI costs + people's time + rework) ÷ accepted work.

  - "Accepted" means a person agreed the work is done, which is why
    testing comes first.

  - Measure it roughly, then change one thing at a time (model, context,
    or rules) and watch which way it moves.

**Microsoft Agent Framework**

  - Acts as an orchestrator and gives each agent the right model for its
    job.

  - Successor to Semantic Kernel and AutoGen; works with models from
    several providers (from the whitepaper).

  - Strong models for planning and heavy builds; fast models for tests,
    backlog, and high-volume work.

**How this applies to my work**

  - How can we define agent efficiency when building out projects?

### GitHub Copilot Harness: Agents and Workflows

Copilot Studio session focused on agents and workflows on the new
harness.

**From the standard harness to the GitHub Copilot harness**

  - The standard (legacy) harness builds a plan, then runs it: intent,
    plan, execute. Less live replanning, easier to inspect.

  - The GitHub Copilot harness reasons in a continuous loop: thought,
    action, observation, decide, always working from the latest state.

  - Don't port, re-architect. Ask what tasks the agent must accomplish
    and upgrade capabilities, not components.

  - Topics, variables, Power Fx, child agents, Adaptive Cards, and agent
    flows give way to skills, memory, hooks, and workflows. Knowledge,
    tools, code execution, and connected agents carry over unchanged.

**Agents vs. workflows**

  - Agents: the path is agile, with some predictable processes. The
    orchestrator's reasoning loop calls skills, hooks, code execution,
    and workflows as tools for deterministic steps. Example: healthcare
    intake from a multi-turn patient conversation.

  - Workflows: the path is predictable, with some agile processes. Start
    and end points are known upfront, with AI embedded where a step
    needs judgment. Example: expense approval routing to a fast path or
    a policy check.

  - Workflows can call agents, and agents can call workflows. The choice
    depends on how much of the process is known before runtime.

**The component model**

  - **Instructions:** always-on guidance like role, scope, tone of
    voice, safety rules, and how to interpret the user's prompt. They
    load on every turn, so include only what matters in every
    conversation. GHCP agents follow instructions very closely.

  - **Skills:** reusable procedures for repeatable actions, kept out of
    the instructions. Same idea as skills in other AI tools: a SKILL.md
    whose name and description are always loaded, with the body and
    resources loaded only when needed, for efficient context use. Avoid
    vague descriptions, do-everything skills, fact dumps, and unreviewed
    community skills.

  - **Knowledge:** searchable docs, sites, and files that ground
    responses; adds value on top of tool calls.

  - **Tools:** live lookups, APIs, CRUD, and actions in external
    systems; also a way to gain knowledge.

  - **Memory:** persistent per-user context and preferences.

  - **Agent sandbox:** runs code when reasoning isn't enough, like ad
    hoc analysis and data manipulation.

  - **Connected agents:** hand off a separate task, with their own
    instructions, tools, and knowledge. They should be task executors,
    used only when needed.

  - **Hooks:** event-driven flows at key points in the agent lifecycle
    to validate inputs or results, handle errors, and enforce controls
    before or after tool runs.

**Workflows**

  - An evolution of the agent flows and cloud flows from the standard
    harness in Copilot Studio.

  - Handles a process with deterministic steps and inline agents,
    combining deterministic and AI-powered steps in one end-to-end
    solution.

  - What maps where: an event-triggered autonomous agent becomes a
    workflow on the same event with AI nodes; an agent flow becomes a
    workflow an agent calls as a tool (text, structured, or JSON
    output); a cloud flow stays a cloud flow unless new functionality
    needs a workflow.

  - Building blocks: triggers (schedule, connector event, HTTP, manual),
    AI nodes (classification, inline and published agents, M365 Copilot
    agents, document extract, computer-using agents planned),
    connectors, functions, human input (review requests, approvals,
    Adaptive Cards in Teams), code execution (planned), and flow
    control.

  - Choose the right level of intelligence per step. Deterministic steps
    for transforms, lookups, and routing where input-to-output is known;
    AI steps when reasoning can't be written as a rule or the path is
    ambiguous.

**How this applies to my work**

  - We consistently get requests that are prime for workflows, but
    workflows seem unavailable in GCC.

  - Need a timeline to decide whether to tell customers to wait for
    these features or build them in the legacy harness.

### Full Stack Apps and Power Platform

A talk about code apps and Power Platform. Lab link from the slides:
talxis.com/lab.

**Less code, fewer problems**

  - More code typically means more problems, no matter who wrote it.

  - Keep the code as small as possible and hand off to Microsoft what
    you can.

  - Low code uses very few primitives.

**Generating code safely with agents**

  - How do we let agentic tools generate code safely? You need a
    sandboxing strategy.

  - The development process runs in three loops:
    
      - Inner loop: implement, build, deploy, test, then hand over to
        integrate.
    
      - Outer loop: integrate, validate, release, manage, then hand over
        to monitor.
    
      - Security loop: monitor, detect, protect, harden.

**Hosts and extensibility**

  - The core is JavaScript and TypeScript apps built on Fluent UI.

  - 4 hosts to choose from: Power Pages, model-driven apps, canvas apps,
    and code apps. Each allows a different degree of JavaScript
    customization.

  - Primary choice: model-driven apps with PCF.

  - Put more business rules and logic in the database, through plug-in
    steps or custom APIs.

**Sandboxes for agents**

  - Multiple ways to set up a sandbox for agents to work in: GitHub
    Codespaces and alternatives.

  - Gives you an isolated area with all the skills needed for Power
    Platform work.

  - They walked through skills from TALXIS.

**What an agent is made of**

  - Five separable layers: model (the LLM on its own, with no tools,
    file access, or memory), context (instructions, skills, tools),
    harness (wraps the model and runs the agent loop; Claude Code is
    one), runtime (your computer or a cloud container), and client (IDE
    chat, CLI, web, desktop app).

  - Don't overload your agent with noise.

**Your data boundary decides the path**

  - Public or non-classified data, no audit trail needed: Copilot
    managed runtime.

  - Data you must contain, with who gets in and what gets out all
    audited: Power Platform + Dataverse.

  - A stack Power Platform can't host: Azure.

  - Why not mix: a backend behind a connector lives outside the repo and
    deploys separately, so frontend and backend can drift apart.

**Deployment**

  - Use end-to-end CI/CD with GitHub, with GitHub PR workflows, for a
    solid deployment cycle.

### The Copilot Compass: Finding True North Across Copilot, Cowork, Scout, and Agents

April Dunnam and Bryan Wofford. Understanding all the different Copilot
products.

**One app, four directions**

  - Microsoft is bringing the Copilot experiences together, including
    code, in one "super app": one place to ask, delegate, build, and
    automate.

  - One front door, four directions, two meters: the seat license covers
    Chat, and Copilot Credits cover Cowork, Code, and Autopilot.

  - Cowork costs credits and isn't included in the seat license.

**What tool to use when**

  - The key question of the session: uncover the traps of when to use
    what.

  - Focus on the outcome and let it drive the tool:
    
      - **Chat (Now, sharpen):** in-the-moment thinking, getting your
        next question answered. Included in your seat.
    
      - **Autopilot (Eyes on it, monitor):** an ongoing job with no
        finish line, watched while you're not. Copilot Credits.
    
      - **Cowork (Send it off, delegate):** a defined deliverable,
        handed back finished. Copilot Credits.
    
      - **Code, Agent Builder, and Copilot Studio (Whole team, scale):**
        when everyone on your team or org needs the same experience,
        like an HR or onboarding agent. Cost depends on the builder.

**This isn't the Copilot you tried last year**

  - Copilot in the apps you use every day is improving.

  - It used to suggest and you did the work; now it makes the changes
    and shows every step.

  - Excel plans first, then builds the tables, PivotTables, and charts.

  - PowerPoint builds from your meetings and files, on your brand
    template.

  - Word revises the whole doc toward a goal, with Track Changes on.

  - Pick your model, including the latest from OpenAI and Anthropic.

**How this applies to my work**

  - GCC availability is still an issue here.

  - We still run into issues with Copilot Chat creating Word docs and
    Excel sheets. In GCC we're still in the "what you remember" column.

  - Initial review: basic, aimed more at everyday users than developers.

### Power Platform Security and Advisor

A fully managed platform to enable scale and reduce risk, organized by
role: managed security (CISO), managed governance (CIO), managed
operations (head of operations), and managed transformation (CAIO). This
session covered managed security.

**Security Hub**

  - Secure scores exist everywhere except Power Platform?

  - Quite opinionated, and meant to simplify: a single pane of glass,
    proactive rules, tailored recommendations, safe defaults, and
    prioritizing actions by risk.

  - Hierarchy: Security Hub, then environment groups, then environments.

**Data protection and privacy**

  - DLP (data policies) is going away. Advanced connector policies (ACP,
    preview) are the replacement, with deeper control.

  - ACP controls individual connector actions, down to fine-tuning like
    read but not write on Dataverse. Applies to environments and
    environment groups, and extends to MCP servers and tools in Copilot
    Studio.

  - Customer-managed key: self-managed encryption keys with automatic
    rotation and private link. Depends on Azure managed HSM / Key Vault.

  - Azure Virtual Network policies: inject into an Azure VNet to limit
    data exfiltration. Once on, actions execute inside the VNet. Works
    for plug-ins and selected connectors.

  - Agents: you can control knowledge sources and link a privacy policy
    to an agent.

**Identity and access**

  - IP firewall: define the addresses or ranges that can access an
    environment.

  - Tenant isolation: recommended, and on by default for new tenants
    since April 2026.

  - IP address-based cookie binding: session cookies can't be reused
    from a different IP, which mitigates session hijacking.

  - Manage sharing and environment routing: route personal environments
    to a group and limit app sharing. Personal developer environments
    become a bigger deal with the Copilot managed runtime.

  - App access control: which apps and external IDs can connect into
    your Dataverse environments.

  - Agent controls: require Entra ID for agents and restrict where users
    can publish.

**Threat detection**

  - Microsoft Defender for Copilot Studio agents gives real-time runtime
    protection, like catching prompt injection. Requires a Defender
    license.

  - Turn off embedded maker credentials when sharing agents.

**Compliance**

  - Auditing; logging events can also be sent to Purview.

  - Customer Lockbox: approve access to your data when Microsoft needs
    it for support.

  - Power Pages is the only product showing in Security Hub today: site
    health scans, anonymous access, WAF, and auth providers.

**How this applies to my work**

  - Does Security Hub exist in GCC?

  - When is ACP coming to GCC, and is it available over API?

  - At CMS we don't currently provision developer environments, and our
    user base is all premium licensed.

  - We already configure auditing.

  - Need to check whether we have the Defender license.

### Copilot-First Design: Smarter Power Apps Solutions with Plans and Generative Pages

Ashley Steiner, Microsoft MVP and Solution Architect. Wednesday, 2:00
PM.

**Plans**

  - A basic look at where AI in Power Platform is today vs. where it
    was.

  - Plans (formerly Plan designer) gives you a head start: from your
    requirements, it scaffolds a solution's tables and apps.

  - Doesn't include flows or agents.

  - Uses 4 agents behind the scenes to build out the solution.

  - How AI turns intent into architecture: understand the business
    problem, identify requirements and personas, recommend business
    processes, design the data model, suggest Power Platform components,
    and generate a solution page.

**How this applies to my work**

  - Plans is available in GCC, but it currently uses
    non-FedRAMP-approved sources to build the plan.

  - It's a citizen developer tool, not one for production scenarios.

  - Could help scope out a problem, be something customers do before
    they come to us, or we could build an agent that does this for us.

  - Overall the session was poor, and we weren't the right audience for
    it.

### Building a Secure Power Platform Architecture with Managed Identity and VNet

Allan De Castro, Global D365 & Power Platform Architect. October 28,
1:30 PM. Didn't attend; notes are from the slides.

**The problem: two questions every integration must answer**

  - Who's calling (authentication), and where does the traffic go
    (network)?

  - Common fixes only hide the secret better: plaintext in code or
    environment variables, "encryption" through a decode function
    (really obfuscation, with the key in the exportable assembly), a
    sysadmin-only table (still at rest, and the read path is an
    exfiltration vector), or secure plug-in configuration (still stored,
    with no rotation or audit).

  - The answer is to remove the problem: no secret (managed identity)
    and no public path (VNet).

**Managed identity: nothing to steal**

  - A workload identity in Entra ID with no credential to manage. Trust
    comes from a federated identity credential (FIC) and short-lived
    tokens at runtime, so nothing sits at rest to steal.

  - Two ways to carry it: a user-assigned managed identity (the default,
    simplest choice), or an app registration with FIC when you need
    Azure Policy on the plug-in's resource access.

  - Azure setup: create the managed identity and a Key Vault with RBAC,
    grant Key Vault Secrets User (never Contributor), and create the FIC
    so Dataverse can authenticate as the identity. The FIC subject ties
    to the environment ID and the plug-in's certificate hash.

  - Dataverse setup: create a managed identity record and link it to the
    plug-in assembly or package. pac managed-identity (preview) scripts
    this, including a check of the FIC before deploy and v1 to v2
    migration; plug-in packages aren't supported in the CLI yet.

  - ALM tip: pre-pick the managed identity GUID and reuse it in every
    environment, so the assembly link works without remapping at
    solution import.

  - Sign the assembly, since the FIC trust is tied to its certificate.
    Self-signed is for dev/test only; production needs a cert from an
    enterprise or public CA. Plug-in packages use nuget sign.

  - Signing in the pipeline: keep the cert in Key Vault (or a GitHub
    Environment secret), use one cert per environment tier, and
    timestamp every signature so it stays valid after the cert expires.

  - At runtime the plug-in gets a token through the managed identity
    service and reads Key Vault. The secret never appears in code,
    config, environment variables, or backups.

  - Still on you: external APIs that don't support managed identity, and
    the network path, since authenticated traffic is still on the public
    internet.

**VNet: nowhere to listen**

  - You delegate a subnet to Power Platform. Plug-in containers get an
    IP from it at runtime and inherit your network policies, while you
    own the NSGs, routing, DNS, NAT Gateway, and Azure Firewall.

  - Internet access isn't restricted by default; that's your job.
    Azure-aware plug-ins don't support VNet.

  - Two VNets in paired regions are a creation-time requirement, not an
    optional DR add-on.

  - Power Platform side: the Microsoft.PowerPlatform.EnterprisePolicies
    PowerShell module creates the delegated VNet and subnet and the
    subnet injection enterprise policy, then links it to the
    environment. Validate with DNS, connectivity, and TLS tests.

  - Pre-provision ahead of time: sandbox host recycling takes about 30
    to 60 minutes, so don't toggle it on a live environment.

  - Azure side: a private endpoint on the target (a Function App in the
    demo), a private DNS zone linked to both VNets, an NSG denying
    internet on the injected subnet, and public access disabled on the
    target.

  - The NSG is the boundary: deny internet, allow VirtualNetwork, first
    match wins. An NSG deny drops traffic silently, so set the SDK to
    fail fast (short timeout, no retries) or you'll hit the 2-minute
    timeout. Use service tags, not IPs.

  - What VNet doesn't give you: governance (you still need Managed
    Environments and DLP) and observability (add NSG flow logs and App
    Insights once traffic is private).

**Closing**

  - Not perfectly secure, but two architecture holes become two
    manageable operational concerns: no secret (managed identity) and a
    private path (VNet).

## Takeaways and follow-ups

**My takeaway:** when we build solutions for customers, focus on
understanding their domain knowledge more than on the app spec.

**My question:** how do developers get access to that domain knowledge?

**GCC availability and timelines**

  - [ ] Copilot Studio GitHub Copilot harness, and agent accounts

  - [ ] Copilot Studio workflows: wait, or build in the legacy harness?

  - [ ] Copilot managed runtime

  - [ ] Pipelines GitHub support and the new Monitor features

  - [ ] Work IQ (GCC / GCC High), and its licensing

  - [ ] Cowork, Autopilot, and the new in-app Copilot features in Word,
    Excel, and PowerPoint

  - [ ] Security Hub

  - [ ] Advanced connector policies, and whether there's an API

  - [ ] Plug-in managed identity

**Team actions**

  - [ ] Learn Monitor in our GCC tenant

  - [ ] Get the Power Platform advisory plugin for our governance team

  - [ ] Check whether we have the Power Platform admin plugin for Cowork

  - [ ] Check whether we have the Defender license for threat detection

**Open questions**

  - [ ] Which areas got the performance gains (Dataverse, canvas apps,
    model-driven apps, flows)?

  - [ ] What data does Work IQ use, and how is it governed?

  - [ ] How do we pair domain-expert makers with governance
    (environments, DLP, ALM)?

  - [ ] Does Power Pages site health apply to SPA sites?

  - [ ] How can we define agent efficiency when building out projects?
